import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'





//middleware
// app.use(async (c, next) => {
//   const token = c.req.header("Authorization")
//   if (!token) {
//     return c.json({ error: "Invalid token" })
//   }
//   else {
//     return next()
//   }
// })

type EnvVars = {
  DATABASE_URL: string
}
const app = new Hono<{ Bindings: EnvVars }>()
app.get('/', (c) => {
  return c.json({
    message: 'Hello World',
  })
})









app.post("/", async (c) => {
  const body = await c.req.json()
  const token = c.req.header("Authorization")
  const query = c.req.query("name")

  return c.json({ msg: "got it", body, token, query })

}

)




app.post("/user", async (c) => {

  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate())
  const { username, password } = await c.req.json();
  const user = prisma.user.create({
    data: {
      username,
      password
    }
  })
  return c.json({ user })

})

export default app
