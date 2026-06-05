let countdownInterval;

function startCountdown() {
    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;

    if (!eventName || !eventDate) {
        alert('Please fill in all fields!');
        return;
    }

    const inputDate = new Date(eventDate).getTime();
    const now = new Date().getTime();

    if (inputDate <= now) {
        alert('Please select a future date!');
        return;
    }

    // Show countdown display
    document.querySelector('.input-section').style.display = 'none';
    document.getElementById('countdownDisplay').classList.remove('hidden');
    document.getElementById('eventTitle').textContent = eventName;
    document.getElementById('completedMessage').classList.add('hidden');

    // Clear any existing interval
    if (countdownInterval) clearInterval(countdownInterval);

    // Update countdown immediately
    updateCountdown(inputDate);

    // Update every 1 second
    countdownInterval = setInterval(() => {
        updateCountdown(inputDate);
    }, 1000);
}

function updateCountdown(targetDate) {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
        document.getElementById('completedMessage').classList.remove('hidden');
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

function resetCountdown() {
    clearInterval(countdownInterval);
    document.getElementById('eventName').value = '';
    document.getElementById('eventDate').value = '';
    document.querySelector('.input-section').style.display = 'flex';
    document.getElementById('countdownDisplay').classList.add('hidden');
}