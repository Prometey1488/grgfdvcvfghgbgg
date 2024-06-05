const DATA_FILE_URL = 'https://github.com/Prometey1488/grgfdvcvfghgbgg/blob/main/data.txt';

async function getScore(userId) {
    try {
        const response = await fetch(DATA_FILE_URL);
        const content = await response.text();
        const lines = content.trim().split('\n');
        for (const line of lines) {
            const [id, score] = line.split(': ');
            if (id === userId) {
                return parseInt(score);
            }
        }
        return 0; // Если счет пользователя не найден
    } catch (error) {
        console.error('Error fetching score:', error);
        return 0;
    }
}

async function updateScore(userId, newScore) {
    try {
        const response = await fetch(DATA_FILE_URL);
        const content = await response.text();
        let updatedContent = '';
        let scoreUpdated = false;
        const lines = content.trim().split('\n');
        for (const line of lines) {
            const [id, score] = line.split(': ');
            if (id === userId) {
                updatedContent += `${id}: ${newScore}\n`;
                scoreUpdated = true;
            } else {
                updatedContent += `${id}: ${score}\n`;
            }
        }
        if (!scoreUpdated) {
            updatedContent += `${userId}: ${newScore}\n`;
        }
        // Заменяем содержимое файла новым
        const updatedResponse = await fetch(DATA_FILE_URL, {
            method: 'PUT',
            body: updatedContent,
        });
    } catch (error) {
        console.error('Error updating score:', error);
    }
}

// Пример использования
const userId = 'user123';
getScore(userId)
    .then(score => console.log('Score:', score))
    .catch(error => console.error('Error:', error));

updateScore(userId, 100)
    .then(() => console.log('Score updated'))
    .catch(error => console.error('Error:', error));
