FROM php:8.2-apache

# Cài extension kết nối MySQL/MariaDB
RUN docker-php-ext-install pdo pdo_mysql mysqli

# Bật mod_rewrite (cần cho điều hướng SPA React Router)
RUN a2enmod rewrite

# Cho phép .htaccess override (AllowOverride All)
RUN sed -ri 's/AllowOverride None/AllowOverride All/g' /etc/apache2/apache2.conf

# Phục vụ FRONTEND đã build (React SPA) ở thư mục gốc web
COPY DiaNhac/dist/ /var/www/html/

# Phục vụ BACKEND API (PHP) ở /api
COPY api/ /var/www/html/api/

# .htaccess điều hướng SPA (mọi route -> index.html, trừ /api và file thật)
COPY .htaccess /var/www/html/.htaccess

EXPOSE 80
