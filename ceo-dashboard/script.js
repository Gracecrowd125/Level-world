// ===========================
// Section Navigation
// ===========================
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Update active nav item
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
        }
    });

    // Update page title
    const titles = {
        dashboard: 'Executive Dashboard',
        metrics: 'Key Metrics',
        team: 'Team Management',
        projects: 'Active Projects',
        analytics: 'Analytics & Insights',
        reports: 'Reports & Documents'
    };
    
    document.getElementById('page-title').textContent = titles[sectionId] || 'Dashboard';

    // Scroll to top
    window.scrollTo(0, 0);
}

// ===========================
// Initialize Dashboard
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    // Set dashboard as default active section
    showSection('dashboard');

    // Add smooth transitions to KPI cards
    animateKPICards();

    // Initialize charts
    initializeCharts();

    // Setup search functionality
    setupSearch();

    // Setup notification handler
    setupNotifications();
});

// ===========================
// Animate KPI Cards on Load
// ===========================
function animateKPICards() {
    const cards = document.querySelectorAll('.kpi-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// ===========================
// Initialize Charts
// ===========================
function initializeCharts() {
    const canvas = document.getElementById('revenueChart');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        
        // Draw simple line chart
        const chartData = [
            { month: 'Jan', revenue: 1.2 },
            { month: 'Feb', revenue: 1.5 },
            { month: 'Mar', revenue: 1.8 },
            { month: 'Apr', revenue: 2.1 },
            { month: 'May', revenue: 2.3 },
            { month: 'Jun', revenue: 2.5 }
        ];

        drawLineChart(ctx, chartData);
    }
}

function drawLineChart(ctx, data) {
    const padding = 40;
    const width = ctx.canvas.width - padding * 2;
    const height = ctx.canvas.height - padding * 2;
    
    // Set canvas size
    ctx.canvas.width = 500;
    ctx.canvas.height = 300;

    // Draw background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw grid lines
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (height / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(ctx.canvas.width - padding, y);
        ctx.stroke();
    }

    // Find max value for scaling
    const maxValue = Math.max(...data.map(d => d.revenue));
    
    // Draw data line
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    data.forEach((point, index) => {
        const x = padding + (width / (data.length - 1)) * index;
        const y = ctx.canvas.height - padding - (point.revenue / maxValue) * height;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();

    // Draw data points
    ctx.fillStyle = '#2563eb';
    data.forEach((point, index) => {
        const x = padding + (width / (data.length - 1)) * index;
        const y = ctx.canvas.height - padding - (point.revenue / maxValue) * height;
        
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();
    });

    // Draw labels
    ctx.fillStyle = '#64748b';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    
    data.forEach((point, index) => {
        const x = padding + (width / (data.length - 1)) * index;
        ctx.fillText(point.month, x, ctx.canvas.height - 10);
    });

    // Draw Y-axis values
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
        const value = (maxValue / 5 * i).toFixed(1);
        const y = ctx.canvas.height - padding - (height / 5) * i;
        ctx.fillText('$' + value + 'M', padding - 10, y + 4);
    }
}

// ===========================
// Search Functionality
// ===========================
function setupSearch() {
    const searchBox = document.querySelector('.search-box');
    
    if (searchBox) {
        searchBox.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            
            if (query.length > 0) {
                performSearch(query);
            }
        });
    }
}

function performSearch(query) {
    console.log('Searching for:', query);
    
    // Example search implementation
    const allCards = document.querySelectorAll('[data-searchable]');
    
    allCards.forEach(card => {
        const content = card.textContent.toLowerCase();
        if (content.includes(query)) {
            card.style.opacity = '1';
        } else {
            card.style.opacity = '0.5';
        }
    });
}

// ===========================
// Notifications
// ===========================
function setupNotifications() {
    const notificationBtn = document.querySelector('.notification-btn');
    
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            showNotificationPanel();
        });
    }
}

function showNotificationPanel() {
    const notifications = [
        { title: 'New Report Available', message: 'Q4 Financial Report is ready for review' },
        { title: 'Team Update', message: 'Sarah Johnson marked her project as 80% complete' },
        { title: 'Budget Alert', message: 'Marketing department is approaching budget limit' }
    ];

    // Create notification panel
    let panel = document.querySelector('.notification-panel');
    if (!panel) {
        panel = document.createElement('div');
        panel.className = 'notification-panel';
        panel.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            width: 350px;
            max-height: 400px;
            overflow-y: auto;
            z-index: 999;
            border: 1px solid #e2e8f0;
        `;

        let html = '<div style="padding: 1.5rem;"><h3 style="margin-top: 0; margin-bottom: 1rem;">Notifications</h3>';
        
        notifications.forEach(notif => {
            html += `
                <div style="padding: 1rem; border-bottom: 1px solid #e2e8f0; cursor: pointer; transition: background 0.3s ease;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='transparent'">
                    <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #1e293b;">${notif.title}</p>
                    <p style="margin: 0; font-size: 0.9rem; color: #64748b;">${notif.message}</p>
                </div>
            `;
        });
        
        html += '</div>';
        panel.innerHTML = html;
        document.body.appendChild(panel);
    } else {
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    }
}

// ===========================
// Settings Handler
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    const settingsBtn = document.querySelector('.settings-btn');
    
    if (settingsBtn) {
        settingsBtn.addEventListener('click', function() {
            showSettingsPanel();
        });
    }
});

function showSettingsPanel() {
    alert('Settings Panel\n\n• Theme Settings\n• Notification Preferences\n• Dashboard Customization\n• Account Settings\n\nThis is a demo dashboard.');
}

// ===========================
// Data Update Simulation
// ===========================
function updateDashboardData() {
    // Simulate real-time data updates
    setInterval(function() {
        const revenueValue = document.querySelector('.kpi-value');
        if (revenueValue) {
            // Random variation
            const baseValue = 2500000;
            const variation = Math.floor(Math.random() * 100000) - 50000;
            const newValue = baseValue + variation;
            
            // Update with animation
            animateValue(revenueValue, 2500000, newValue, 1000);
        }
    }, 5000);
}

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const original = element.textContent;
    
    const step = function(timestamp) {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(start + progress * (end - start));
        
        element.textContent = '$' + (value / 1000000).toFixed(1) + 'M';
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    window.requestAnimationFrame(step);
}

// ===========================
// Export Data Functions
// ===========================
function exportToCSV(filename) {
    const csv = 'Month,Revenue,Growth\nJan,1.2M,+5%\nFeb,1.5M,+8%\nMar,1.8M,+12%\nApr,2.1M,+15%\nMay,2.3M,+18%\nJun,2.5M,+20%';
    const link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    link.download = filename || 'report.csv';
    link.click();
}

function exportToPDF() {
    alert('PDF Export Feature\n\nIn a production dashboard, this would generate a comprehensive PDF report with all metrics, charts, and analysis.');
}

// ===========================
// Responsive Navigation
// ===========================
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.left = sidebar.style.left === '-280px' ? '0' : '-280px';
}

// Close notification panel on outside click
document.addEventListener('click', function(event) {
    const panel = document.querySelector('.notification-panel');
    const notificationBtn = document.querySelector('.notification-btn');
    
    if (panel && event.target !== notificationBtn && !panel.contains(event.target)) {
        panel.style.display = 'none';
    }
});

// ===========================
// Keyboard Shortcuts
// ===========================
document.addEventListener('keydown', function(event) {
    // Ctrl+/ or Cmd+/ to show shortcuts
    if ((event.ctrlKey || event.metaKey) && event.key === '/') {
        event.preventDefault();
        showKeyboardShortcuts();
    }
    
    // Ctrl+K or Cmd+K to focus search
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        document.querySelector('.search-box').focus();
    }
});

function showKeyboardShortcuts() {
    const shortcuts = `
⌨️ Keyboard Shortcuts

Ctrl/Cmd + K : Focus Search
Ctrl/Cmd + / : Show This Help

Navigation:
- Click sidebar items to switch sections
- Dashboard: View KPIs and activity
- Metrics: Check key performance indicators
- Team: Manage team members
- Projects: Track active projects
- Analytics: View analytics data
- Reports: Download reports
    `;
    
    alert(shortcuts);
}

// ===========================
// Console Welcome Message
// ===========================
console.log('%c📊 Welcome to CEO Dashboard', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cExecutive Dashboard System', 'color: #1e40af; font-size: 14px;');
console.log('%cPowering business intelligence and executive decision-making', 'color: #64748b; font-size: 12px;');
console.log('\n💡 Keyboard Shortcuts:\n- Ctrl/Cmd + K: Focus Search\n- Ctrl/Cmd + /: Show Help');
