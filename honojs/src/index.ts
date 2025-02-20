import { Hono } from 'hono'

const app = new Hono()
//middleware
app.use(async (c, next) => {
  const token = c.req.header("Authorization")
  if (!token) {
    return c.json({ error: "Invalid token" })
  }
  else {
    return next()
  }
})
app.get('/', (c) => {
  return c.json({
    message: 'Hello World',
  })
})









app.post("/user", async (c) => {
  const body = await c.req.json()
  const token = c.req.header("Authorization")
  const query = c.req.query("name")

  return c.json({ msg: "got it", body, token, query })

}

)

export default app
