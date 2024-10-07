import { Hono } from "hono"

const app = new Hono()

const webflowDomain = "https://hhhunthomesdev.com"


// Directly handle specific URLs you want to ignore
app.get("/new-homes/virginia/richmond/communities", async (c) => {
  return fetch(c.req.raw) // Simply fetch the URL as is, or return a default response
})

app.get("/new-homes/virginia/suffolk/communities", async (c) => {
  return fetch(c.req.raw)
})

app.get("/new-homes/virginia/williamsburg/communities", async (c) => {
  return fetch(c.req.raw)
})

app.get("/new-homes/north-carolina/raleigh-durham/communities", async (c) => {
  return fetch(c.req.raw)
})

app.get("/new-homes/north-carolina/southern-pines-carthage/communities", async (c) => {
  return fetch(c.req.raw)
})

// ***** Define other routes

//communities
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

//floor plans
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

//move-in-ready homes
app.get("/new-homes/:state/:city/:community/move-in-ready-homes/:address", async (c) => {
  const { state, city, community, address } = c.req.param()
  const url = new URL(
    `${webflowDomain}/new-homes/move-in-ready-homes/${address}--${community}--${city}--${state}`
  )
  const originalUrl = new URL(c.req.url)
  for (const [key, value] of originalUrl.searchParams) {
    url.searchParams.set(key, value)
  }
  return fetch(url)
})

// ***** Handle other cases or redirects as needed

/*
app.get("/new-homes/region/:slug", async (c) => {
  const { slug } = c.req.param()
  const [city, state] = slug.split("--")
  const url = new URL(`${webflowDomain}/new-homes/${state}/${city}/communities`)
  const originalUrl = new URL(c.req.url)
  for (const [key, value] of originalUrl.searchParams) {
    url.searchParams.set(key, value)
  }
  return c.redirect(url.toString())
})

*/

app.get("/new-homes/communities/:slug", async (c) => {
  const { slug } = c.req.param()
  const [community, state, city] = slug.split("--")
  const url = new URL(
    `${webflowDomain}/new-homes/${state}/${city}/${community}`
  )
  const originalUrl = new URL(c.req.url)
  for (const [key, value] of originalUrl.searchParams) {
    url.searchParams.set(key, value)
  }
  return c.redirect(url.toString())
})

app.get("/new-homes/floor-plans-and-models/:slug", async (c) => {
  const { slug } = c.req.param()
  const [floorPlanName, community, state, city] = slug.split("--")
  const url = new URL(
    `${webflowDomain}/new-homes/${state}/${city}/${community}/floorplans/${floorPlanName}`
  )
  const originalUrl = new URL(c.req.url)
  for (const [key, value] of originalUrl.searchParams) {
    url.searchParams.set(key, value)
  }
  return c.redirect(url.toString())
})

app.get("/new-homes/move-in-ready-homes/:slug", async (c) => {
  const { slug } = c.req.param()
  const [specAddress, community, state, city] = slug.split("--")
  const url = new URL(
    `${webflowDomain}/new-homes/${state}/${city}/${community}/move-in-ready-homes/${specAddress}`
  )
  const originalUrl = new URL(c.req.url)
  for (const [key, value] of originalUrl.searchParams) {
    url.searchParams.set(key, value)
  }
  return c.redirect(url.toString())
})

app.use("*", (c) => fetch(c.req.raw))

export default app
