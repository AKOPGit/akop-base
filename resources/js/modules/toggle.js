export function init() {
    document.addEventListener('mouseover', (event) => {
        const trigger = event.target.closest('[ak-toggle]');

        if (trigger) {
            const data = {
                id: trigger.getAttribute('ak-toggle'),
                event: trigger.getAttribute('ak-toggle-event') || 'click',
                toggleClasses: (trigger.getAttribute('ak-toggle-classes') || '').split(' '),
                once: trigger.hasAttribute('ak-toggle-once') ?? false,
                closeOnBlur: trigger.getAttribute('ak-toggle-close-on-blur'),
                toggleOnMouseOut: trigger.hasAttribute('ak-toggle-on-mouseout')
            };

            if (!data.id || !data.event) return;

            if (!trigger.toggleEventAdded) {
                trigger.addEventListener(data.event, (event) => {
                    toggleElement(data.id, data.toggleClasses, event);

                    if (data.closeOnBlur === 'true') {
                        const targetElement = document.getElementById(data.id);

                        // Function to handle outside clicks
                        const handleClickOutside = (e) => {
                            if (!targetElement.contains(e.target) && !trigger.contains(e.target)) {
                                toggleElement(data.id, data.toggleClasses, e);
                                document.removeEventListener('click', handleClickOutside);
                            }
                        };

                        document.addEventListener('click', handleClickOutside);
                    }
                }, { once: data.once });

                trigger.toggleEventAdded = true;
            }

            if (data.toggleOnMouseOut) {
                if (!trigger.toggleOnMouseOutEventAdded) {
                    trigger.addEventListener('mouseout', (event) => {
                        toggleElement(data.id, data.toggleClasses, event);
                    }, { once: data.once });

                    trigger.toggleOnMouseOutEventAdded = true;
                }
            }
        }
    });
}

export function toggleElement(elementId, toggleClasses, event) {
    const element = document.getElementById(elementId);
    const triggerClosedState = document.getElementById(`${elementId}-closed-state`);
    const triggerOpenedState = document.getElementById(`${elementId}-opened-state`);

    if (element) {
        toggleClasses.forEach((toggleClass) => {
            if (toggleClass.includes(':')) {
                const [actualClass, timeToWait] = toggleClass.split(':');
                setTimeout(() => { element.classList.toggle(actualClass); }, timeToWait);
            } else {
                element.classList.toggle(toggleClass);
            }
        });
    }

    if (triggerClosedState && triggerOpenedState) {
        triggerClosedState.classList.toggle('hidden');
        triggerOpenedState.classList.toggle('hidden');
    }

    event.stopPropagation();
}
