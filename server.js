const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// PostgreSQL bağlantısı (Neon)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('localhost') ? false : { rejectUnauthorized: false }
});

// API: Yeni fırsat ekle (n8n'den gelecek)
app.post('/api/deals', async (req, res) => {
  const { source, title, price, url } = req.body;
  
  if (!source || !title || !url) {
    return res.status(400).json({ error: 'source, title ve url zorunludur' });
  }

  try {
    const query = `
      INSERT INTO deals (source, title, price, url)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (url) DO NOTHING
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [source, title, price || null, url]);
    
    if (rows.length === 0) {
      return res.status(200).json({ message: 'Bu fırsat zaten kayıtlı', duplicate: true });
    }
    
    res.status(201).json({ success: true, data: rows[0] });
  } catch (err) {
    console.error('Veritabanı hatası:', err);
    res.status(500).json({ error: 'Veritabanı hatası', details: err.message });
  }
});

// API: Tüm fırsatları getir (tarih sırasına göre)
app.get('/api/deals', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const { rows } = await pool.query(
      `SELECT * FROM deals 
       ORDER BY created_at DESC 
       LIMIT $1`,
      [limit]
    );
    res.json(rows);
  } catch (err) {
    console.error('Veritabanı hatası:', err);
    res.status(500).json({ error: 'Veritabanı hatası', details: err.message });
  }
});

// API: Aktif fırsatları getir (İndirim Bitti olmayanlar)
app.get('/api/deals/active', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const { rows } = await pool.query(
      `SELECT * FROM deals 
       WHERE title NOT ILIKE '%indirim bitti%' 
       AND title NOT ILIKE '%x indirim%'
       ORDER BY created_at DESC 
       LIMIT $1`,
      [limit]
    );
    res.json(rows);
  } catch (err) {
    console.error('Veritabanı hatası:', err);
    res.status(500).json({ error: 'Veritabanı hatası', details: err.message });
  }
});

// API: Sağlık kontrolü
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (err) {
    res.status(500).json({ status: 'error', database: 'disconnected', error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server çalışıyor: http://localhost:${PORT}`);
  console.log(`📊 API endpoint: http://localhost:${PORT}/api/deals`);
});

