# Instruções e dicas gerais

## Script de deploy
```
set -x
function execute_run_php () {

cd /var/www/

sudo chown -R www-data:www-data s360

cd /var/www/s360/

sudo chmod -R 777 bootstrap/cache
sudo chmod -R 777 storage

sudo chmod -R 777 storage/logs
sudo chown -R www-data:www-data storage/logs

composer install --optimize-autoloader
composer install --prefer-dist --no-scripts
npm install

php artisan storage:link

sudo chown -R www-data:www-data /var/www/s360
sudo chmod -R 775 /var/www/s360
sudo chmod -R 777 bootstrap/cache
sudo chmod -R 777 storage

sudo -u www-data npm run build

php artisan migrate --force
#### php artisan db:seed --force
php artisan optimize:clear
php artisan optimize
php artisan route:cache
php artisan view:cache
php artisan cache:clear
php artisan route:clear
php artisan config:clear
php artisan config:cache
php artisan queue:restart
php artisan event:cache

sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl restart all

sudo chown -R www-data:www-data storage/logs

}

sudo bash -exc "$(declare -f  execute_run_php) ;  execute_run_php"
```
## Configuração do `supervisorctl`

### 1. Arquivo de configuração
```
sudo nano /etc/supervisor/conf.d/laravel-horizon.conf
```

### 2. Conteúdo da configuração 
```
[program:laravel-horizon]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/s360/artisan horizon
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=root
numprocs=1
redirect_stderr=true
stdout_logfile=/var/www/s360/storage/logs/horizon.log
```

Em seguida rodar `sudo supervisorctl reread
sudo supervisorctl update`
