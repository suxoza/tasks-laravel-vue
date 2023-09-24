

create database laravel_tasks character set utf8 collate utf8_unicode_ci;
create user laravel_tasks_user@'localhost' identified by 'laravel_tasks_user';
grant all privileges on laravel_tasks.* TO 'laravel_tasks_user'@'localhost';
flush privileges;