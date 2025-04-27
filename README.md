1. Buat Screen & Masuk ke dalam folder direktori

```bash
screen -S monitoring-api-vps
cd api-monitoring-vps
```

2. Install Node JS
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

3. Open Port (8088)
 ```bash  
sudo ufw allow 8088/tcp
sudo ufw reload
```

4. Install Express
 ```bash
npm init -y
npm install express
```
5. Jalankan api
 ```bash
node server.js
```

6. Cek di browser http://IPVPS:8088/api/status

7. Script Google Sheet
 ```bash
function getServerStatusVPS() {
//Batas
var url = "http://128.199.200.189:8088/api/status"; // Ganti dengan API Anda
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Monitoring VPS");
  try {
    var response = UrlFetchApp.fetch(url, { muteHttpExceptions: true }); // Tangani error
    var data = JSON.parse(response.getContentText());

    var status = "Online"; // Jika berhasil, status Online
    var uptime = data.uptime;
    var ip = data.ip;
    var cpu1 = data.cpuLoad[0];
    var cpu5 = data.cpuLoad[1];
    var cpu15 = data.cpuLoad[2];

  } catch (e) {
    var status = "Offline"; // Jika gagal, status Offline
    var uptime = "-";  // Kosongkan data jika server down
    var ip = "_";
    var cpu1 = "-";
    var cpu5 = "-";
    var cpu15 = "-";
  }

  // Tulis data di baris ke-2 (menimpa data sebelumnya)
  sheet.getRange(3, 1, 1, 7).setValues([[
    new Date(),  // Waktu update
    status,      // Status Online/Offline
    ip,          // IP Server
    uptime,      // Uptime
    cpu1,        // CPU Load (1 min)
    cpu5,        // CPU Load (5 min)
    cpu15        // CPU Load (15 min)
  ]]);
}
```
8. Atur triger script sesuai keingginan & buat sheet dengan nama Monitoring VPS

9. DONE

