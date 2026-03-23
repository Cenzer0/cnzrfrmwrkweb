// Interactive features for CNZR website

// Fetch and display stats
async function loadStats() {
  try {
    const response = await fetch('/api/stats');
    const data = await response.json();
    console.log('Stats loaded:', data);
  } catch (error) {
    console.error('Failed to load stats:', error);
  }
}

// Copy code to clipboard
function copyCode(elementId) {
  const element = document.getElementById(elementId);
  const text = element.textContent;
  
  navigator.clipboard.writeText(text).then(() => {
    showNotification('Code copied to clipboard!');
  }).catch(err => {
    console.error('Failed to copy:', err);
  });
}

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'fixed bottom-4 right-4 bg-pixel-purple border-2 border-pixel-pink p-4 shadow-pixel z-50 animate-slide-in';
  notification.innerHTML = `<span class="text-pixel-white font-pixel text-xs">${message}</span>`;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  loadStats();
});
