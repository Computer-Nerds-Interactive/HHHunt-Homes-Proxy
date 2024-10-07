import { Hono } from "hono"

const app = new Hono()

const webflowDomain = "https://hhhunthomesdev.com"

app.get("/new-homes/:state/:city/communities", async (c) => {
  const { city, state } = c.req.param()
  console.log(state, city)

  //Get the communities from the webflow
  const url = new URL(`${webflowDomain}/new-homes/${city}/${state}/communities`)
  console.log(url.toString())
  const originalUrl = new URL(c.req.url)
  for (const [key, value] of originalUrl.searchParams) {
    url.searchParams.set(key, value)
  }
  return fetch(url)
})

app.get("/new-homes/:state/:city/:id", async (c) => {
  const { state, city, id } = c.req.param()

  //Get the communities from the webflow
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
  console.log(state, city, community, slug)

  //Get the communities from the webflow
  const url = new URL(
    `${webflowDomain}/new-homes/floor-plans-and-models/${slug}--${community}--${state}--${city}`
  )
  const originalUrl = new URL(c.req.url)
  for (const [key, value] of originalUrl.searchParams) {
    url.searchParams.set(key, value)
  }
  return fetch(url)
})

//handle rediect to communities page
app.get("/new-homes/communities/:slug", async (c) => {
  const { slug } = c.req.param()
  //get city and state from slug separated by "-"
  const [community, state, city] = slug.split("--")
  console.log(community, state, city)

  const url = new URL(
    `${webflowDomain}/new-homes/${state}/${city}/${community}`
  )
  const originalUrl = new URL(c.req.url)
  for (const [key, value] of originalUrl.searchParams) {
    url.searchParams.set(key, value)
  }
  return c.redirect(url.toString())
})

//handle rediect to floorplans page
app.get("/new-homes/floor-plans-and-models/:slug", async (c) => {
  const { slug } = c.req.param()
  //get city and state from slug separated by "-"
  const [floorPlanName, community, state, city] = slug.split("--")
  console.log(floorPlanName, community, state, city)

  const url = new URL(
    `${webflowDomain}/new-homes/${state}/${city}/${community}/floorplans/${floorPlanName}`
  )
  const originalUrl = new URL(c.req.url)
  for (const [key, value] of originalUrl.searchParams) {
    url.searchParams.set(key, value)
  }
  return c.redirect(url.toString())
})

app.use("*", (c) => fetch(c.req.raw))

export default app