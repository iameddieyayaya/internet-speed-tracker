import speedtest
import schedule
import time
import sqlite3
from datetime import datetime
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def init_db():
    conn = sqlite3.connect('speedtest_data.db')
    c = conn.cursor()
    c.execute('''
    CREATE TABLE IF NOT EXISTS speedtest (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp TEXT,
        download_speed REAL,
        upload_speed REAL,
        ping REAL
    )
    ''')
    conn.commit()
    conn.close()

def run_speed_test():
    s = speedtest.Speedtest()
    download_speed = s.download() / 1_000_000
    upload_speed = s.upload() / 1_000_000
    ping = s.results.ping
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    conn = sqlite3.connect('speedtest_data.db')
    c = conn.cursor()
    c.execute('INSERT INTO speedtest (timestamp, download_speed, upload_speed, ping) VALUES (?, ?, ?, ?)',
              (timestamp, download_speed, upload_speed, ping))
    conn.commit()
    conn.close()

schedule.every(1).hour.do(run_speed_test)

@app.route('/api/speedtest', methods=['GET'])
def get_speedtest_data():
    filter_type = request.args.get('filter', 'daily')
    
    conn = sqlite3.connect('speedtest_data.db')
    c = conn.cursor()

    if filter_type == 'daily':
        start_date = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
        c.execute('SELECT * FROM speedtest WHERE timestamp >= ?', (start_date.strftime("%Y-%m-%d %H:%M:%S"),))
    elif filter_type == 'weekly':
        one_week_ago = (datetime.now() - timedelta(weeks=1)).strftime("%Y-%m-%d %H:%M:%S")
        c.execute('SELECT * FROM speedtest WHERE timestamp >= ?', (one_week_ago,))
    elif filter_type == 'monthly':
        one_month_ago = (datetime.now() - timedelta(days=30)).strftime("%Y-%m-%d %H:%M:%S")
        c.execute('SELECT * FROM speedtest WHERE timestamp >= ?', (one_month_ago,))
    else:
        c.execute('SELECT * FROM speedtest')

    data = c.fetchall()
    conn.close()

    results = [
        {
            'id': row[0],
            'timestamp': row[1],
            'download_speed': row[2],
            'upload_speed': row[3],
            'ping': row[4]
        }
        for row in data
    ]

    return jsonify(results)

if __name__ == '__main__':
    init_db()
    run_speed_test()
    app.run(host='0.0.0.0', port=8000)
    while True:
        schedule.run_pending()
        time.sleep(1)