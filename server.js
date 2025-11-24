const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')

const app = express()
app.use(cors())
app.use(express.json())

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

// 登入 API
app.post('/login', (req, res) => {
  const { username, password } = req.body
  if (username === 'admin' && password === '123456') {
    res.json({ success: true })
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
    res.json([
      { id: 1, name: '無線藍牙耳機 Pro', cost: 850, price: 1880, stock: 8 },
      { id: 2, name: '304不鏽鋼保溫杯', cost: 320, price: 699, stock: 156 }
    ])
  }
})

// 訂單 API
app.get('/orders', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders')
    res.json(result.rows)
  } catch (err) {
    res.json([])
  }
})

app.post('/orders', async (req, res) => {
  const { order_number, total, items } = req.body
  try {
    await pool.query('INSERT INTO orders (order_number, total, items) VALUES ($1, $2, $3)', [order_number, total, JSON.stringify(items)])
    res.json({ success: true })
  } catch (err) {
    res.json({ success: false })
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
