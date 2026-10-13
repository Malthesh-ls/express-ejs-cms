    const themeToggler = document.getElementById('themeToggler');
    const themeIcon = document.getElementById('themeIcon');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarMenu = document.getElementById('sidebarMenu');

    let gridColor = '#dee2e6';
    let textMutedColor = '#6c757d';

    sidebarToggle.addEventListener('click', () => {
      sidebarMenu.classList.toggle('show');
    });

    const salesChartCtx = document.getElementById('salesChart').getContext('2d');
    const salesChart = new Chart(salesChartCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          data: [75, 85, 80, 70, 65, 65, 70, 82, 88, 74, 81, 95],
          borderColor: '#635bff',
          borderWidth: 3,
          tension: 0.38,
          pointRadius: 3,
          pointBackgroundColor: '#635bff',
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: () => gridColor }, ticks: { color: () => textMutedColor } },
          y: { display: false }
        }
      }
    });
