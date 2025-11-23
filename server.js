const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Pool } = require('pg')

const app = express()
app.use(cors())
app.use(express.json())

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

// 登入 API
app.post('/login', async (req, res) => {
  const { username, password } = req.body
  if (username === 'admin' && password === '123456') {
    const token = jwt.sign({ userId: 1 }, 'secret')
    res.json({ success: true, token })
  } else {
    res.json({ success: false })
  }
})

// 產品 API
app.get('/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products')
    res.json(result.rows)
  } catch (err) {
    // 模擬資料
    res.json([
      { id: 1, name: '無線藍牙耳機 Pro', cost: 850, price: 1880, stock: 8 },
      { id: 2, name: '304不鏽鋼保溫杯', cost: 320, price: 699, stock: 156 }
    ])
  }
})

// 訂單 API (模擬)
app.get('/orders', (req, res) => {
  res.json([
    { id: 1, date: '2025-11-23', total: 12900, status: '已出貨' },
    { id: 2, date: '2025-11-22', total: 25000, status: '待確認' }
  ])
})

app.post('/orders', (req, res) => {
  res.json({ success: true, id: 3 })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
