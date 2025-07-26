import {EditorState} from 'prosemirror-state'
import {EditorView} from 'prosemirror-view'
import {Schema, DOMParser as ProseParser, DOMSerializer} from 'prosemirror-model'
import {schema as basicSchema} from 'prosemirror-schema-basic'
import {addListNodes, wrapInList} from 'prosemirror-schema-list'
import {history, undo, redo} from 'prosemirror-history'
import {keymap} from 'prosemirror-keymap'
import {baseKeymap, toggleMark, setBlockType, wrapIn} from 'prosemirror-commands'
import {inputRules, textblockTypeInputRule} from 'prosemirror-inputrules'

const underline = {
    parseDOM: [{tag: 'u'}, {style: 'text-decoration=underline'}],
    toDOM() { return ['u', 0] }
}

const strike = {
    parseDOM: [{tag: 's'}, {tag: 'del'}, {style: 'text-decoration=line-through'}],
    toDOM() { return ['s', 0] }
}

export function init() {
    document.querySelectorAll('[data-rich-text-editor]').forEach(container => {
        if (container.editor) return
        const targetId = container.id
        const hidden = document.querySelector(`[data-editor-target="${targetId}"]`)
        const value = hidden ? hidden.value : ''

        const nodes = addListNodes(basicSchema.spec.nodes, 'paragraph block*', 'block')
            .update('paragraph', {
                content: 'inline*',
                group: 'block',
                attrs: {align: {default: 'left'}},
                parseDOM: [{tag: 'p', getAttrs: dom => ({align: dom.style.textAlign || 'left'})}],
                toDOM(node) { return ['p', {style: `text-align:${node.attrs.align}`}, 0] }
            })
            .update('heading', {
                content: 'inline*',
                group: 'block',
                defining: true,
                attrs: {level: {default: 1}, align: {default: 'left'}},
                parseDOM: [
                    {tag: 'h1', getAttrs: dom => ({level:1, align: dom.style.textAlign || 'left'})},
                    {tag: 'h2', getAttrs: dom => ({level:2, align: dom.style.textAlign || 'left'})},
                    {tag: 'h3', getAttrs: dom => ({level:3, align: dom.style.textAlign || 'left'})},
                    {tag: 'h4', getAttrs: dom => ({level:4, align: dom.style.textAlign || 'left'})},
                    {tag: 'h5', getAttrs: dom => ({level:5, align: dom.style.textAlign || 'left'})},
                    {tag: 'h6', getAttrs: dom => ({level:6, align: dom.style.textAlign || 'left'})},
                ],
                toDOM(node) { return ['h'+node.attrs.level, {style: `text-align:${node.attrs.align}`}, 0] }
            })

        const marks = basicSchema.spec.marks
            .addBefore('link', 'underline', underline)
            .addToEnd('strike', strike)

        const schema = new Schema({nodes, marks})

        const parser = new DOMParser()
        const content = parser.parseFromString(value || '<p></p>', 'text/html')
        const state = EditorState.create({
            doc: ProseParser.fromSchema(schema).parse(content.body),
            plugins: [
                history(),
                inputRules({rules: buildInputRules(schema)}),
                keymap(baseKeymap)
            ]
        })

        const view = new EditorView(container.querySelector('.editor'), {
            state,
            dispatchTransaction(tr){
                const newState = view.state.apply(tr)
                view.updateState(newState)
                if(hidden){
                    hidden.value = getHTML(view.state.doc, schema)
                }
            }
        })

        setupToolbar(container, schema, view)
        container.editor = view
    })
}

function setupToolbar(container, schema, view){
    container.querySelectorAll('[data-command]').forEach(btn => {
        const cmd = btn.getAttribute('data-command')
        if(cmd === 'heading'){
            btn.addEventListener('change', e => {
                const level = Number(e.target.value)
                if(level === 0){
                    setBlockType(schema.nodes.paragraph)(view.state, view.dispatch)
                }else{
                    setBlockType(schema.nodes.heading, {level})(view.state, view.dispatch)
                }
                view.focus()
            })
        } else if(cmd === 'bullet'){
            btn.addEventListener('click', () => {
                wrapInList(schema.nodes.bullet_list)(view.state, view.dispatch)
                view.focus()
            })
        } else if(cmd === 'ordered'){
            btn.addEventListener('click', () => {
                wrapInList(schema.nodes.ordered_list)(view.state, view.dispatch)
                view.focus()
            })
        } else if(cmd === 'blockquote'){
            btn.addEventListener('click', () => {
                wrapIn(schema.nodes.blockquote)(view.state, view.dispatch)
                view.focus()
            })
        } else if(cmd === 'code'){
            btn.addEventListener('click', () => {
                setBlockType(schema.nodes.code_block)(view.state, view.dispatch)
                view.focus()
            })
        } else if(cmd === 'bold'){
            btn.addEventListener('click', () => {
                toggleMark(schema.marks.strong)(view.state, view.dispatch)
                view.focus()
            })
        } else if(cmd === 'italic'){
            btn.addEventListener('click', () => {
                toggleMark(schema.marks.em)(view.state, view.dispatch)
                view.focus()
            })
        } else if(cmd === 'strike'){
            btn.addEventListener('click', () => {
                toggleMark(schema.marks.strike)(view.state, view.dispatch)
                view.focus()
            })
        } else if(cmd === 'underline'){
            btn.addEventListener('click', () => {
                toggleMark(schema.marks.underline)(view.state, view.dispatch)
                view.focus()
            })
        } else if(cmd === 'link'){
            btn.addEventListener('click', () => {
                const url = prompt('URL')
                if(url){
                    toggleMark(schema.marks.link, {href: url})(view.state, view.dispatch)
                    view.focus()
                }
            })
        } else if(cmd === 'align-left' || cmd === 'align-center' || cmd === 'align-right'){
            btn.addEventListener('click', () => {
                const align = cmd.split('-')[1]
                setBlockType(getCurrentBlockType(view, schema), {align})(view.state, view.dispatch)
                view.focus()
            })
        } else if(cmd === 'undo'){
            btn.addEventListener('click', () => { undo(view.state, view.dispatch); view.focus() })
        } else if(cmd === 'redo'){
            btn.addEventListener('click', () => { redo(view.state, view.dispatch); view.focus() })
        }
    })
}

function getCurrentBlockType(view, schema){
    const {$from} = view.state.selection
    if($from.parent.type === schema.nodes.heading) return schema.nodes.heading
    if($from.parent.type === schema.nodes.code_block) return schema.nodes.code_block
    if($from.parent.type === schema.nodes.blockquote) return schema.nodes.blockquote
    return schema.nodes.paragraph
}

function getHTML(doc, schema){
    const div = document.createElement('div')
    div.appendChild(DOMSerializer.fromSchema(schema).serializeFragment(doc.content))
    return div.innerHTML
}

function buildInputRules(schema){
    const rules = []
    if(schema.nodes.heading){
        rules.push(textblockTypeInputRule(/^(#{1,6})\s$/, schema.nodes.heading, match => ({level: match[1].length})) )
    }
    return rules
}
