import { Hono } from "hono"

const app = new Hono()

const webflowDomain = "https://hhhunthomesdev.com"

// Explicitly handle the URL you want to ignore or process differently
app.get("/new-homes/virginia/richmond/communities", async (c) => {
  return c.text("This URL is ignored or handled differently")
})

// Define other routes as needed
app.get("/new-homes/:state/:city/:id", async (c) => {
  const { state, city, id } = c.req.param()
  const url = new URL(
    `${webflowDomain}/new-homes/communities/${id}--${state}--${city}`
  )
  const originalUrl = new URL(c.req.url)
  for (const [key, value] of originalUrl.searchParams) {
    url.searchParams.set(key, value)
  }
  return fetch(url)
})

app.get("/new-homes/:state/:city/:community/floorplans/:slug", async (c) => {
  const { state, city, community, slug } = c.req.param()
  const url = new URL(
    `${webflowDomain}/new-homes/floor-plans-and-models/${slug}--${community}--${state}--${city}`
  )
  const originalUrl = new URL(c.req.url)
  for (const [key, value] of originalUrl.searchParams) {
    url.searchParams.set(key, value)
  }
  return fetch(url)
})

// Handle other cases or redirects as needed

app.use("*", (c) => fetch(c.req.raw))

export default app
