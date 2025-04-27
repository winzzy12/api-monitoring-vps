const express = require('express');
const os = require('os');
const app = express();
const port = 8088;

app.get('/api/status', (req, res) => {
  const uptimeSeconds = os.uptime(); // uptime dalam detik
  const uptimeFormatted = formatUptime(uptimeSeconds); // Format jadi hari jam menit
  const ipAddresses = getIPAddresses();
  const cpuLoad = os.loadavg();

  res.json({
    uptime: uptimeFormatted,
    ip: ipAddresses[0] || 'Unknown',
    cpuLoad: cpuLoad
  });
});

// Fungsi untuk ambil semua IP address (IPv4 non-internal)
function getIPAddresses() {
  const interfaces = os.networkInterfaces();
  const addresses = [];

  for (let iface in interfaces) {
    for (let i = 0; i < interfaces[iface].length; i++) {
      const addressInfo = interfaces[iface][i];
      if (addressInfo.family === 'IPv4' && !addressInfo.internal) {
        addresses.push(addressInfo.address);
      }
    }
  }
  return addresses;
}

// Fungsi untuk format uptime (detik ke hari jam menit)
function formatUptime(seconds) {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const parts = [];
  if (days > 0) parts.push(`${days} hari`);
  if (hours > 0) parts.push(`${hours} jam`);
  if (minutes > 0) parts.push(`${minutes} menit`);

  return parts.join(' ') || '0 menit';
}

app.listen(port, '0.0.0.0', () => {
  console.log(`Server status API running at http://0.0.0.0:${port}/api/status`);
});
