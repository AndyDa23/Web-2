# Используем официальный Node.js образ
FROM node:22

# Рабочая директория внутри контейнера
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект внутрь контейнера
COPY . .

# Открываем порт приложения
EXPOSE 3000

# Запускаем сервер
CMD ["npm", "start"]
