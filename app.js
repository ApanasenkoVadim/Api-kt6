document.getElementById('backBtn').addEventListener('click', () => {
    window.history.back();
});

document.getElementById('forwardBtn').addEventListener('click', () => {
    window.history.forward();
});

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let x = 50, y = 50, dx = 2, dy = 2;
let radius = 20;

function drawBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();

    // Двигаем мячик
    x += dx;
    y += dy;

    if (x + radius > canvas.width || x - radius < 0) {
        dx = -dx;
    }
    if (y + radius > canvas.height || y - radius < 0) {
        dy = -dy;
    }
}

function animate() {
    drawBall();
    requestAnimationFrame(animate); 
}

animate();

if (window.Worker) {
    const worker = new Worker(URL.createObjectURL(new Blob([`
        onmessage = function(e) {
            let result = 0;
            // Сложное вычисление
            for (let i = 0; i < e.data; i++) {
                result += Math.sqrt(i);
            }
            postMessage(result);
        }
    `])));

    worker.onmessage = function(e) {
        document.getElementById('workerOutput').textContent = 'Результат вычислений: ' + e.data;
    };

    document.getElementById('startWorkerBtn').addEventListener('click', () => {
        document.getElementById('workerOutput').textContent = 'Вычисления выполняются...';
        worker.postMessage(1000000);  
    });
} else {
    document.getElementById('workerOutput').textContent = 'Ваш браузер не поддерживает Web Workers.';
}