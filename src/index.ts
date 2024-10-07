import { Hono } from "hono"

const app = new Hono()

const webflowDomain = "https://hhhunthomesdev.com"

app.get("/new-homes/virginia/richmond/communities", async (c) => {
  const url = new URL(`${webflowDomain}/new-homes/virginia/richmond/communities`)
  return fetch(url)
})

app.get("/new-homes/:state/:city/:id", async (c) => {
  const { state, city, id } = c.req.param()

  //Get the communities from the webflow
  const url = new URL(
    `${webflowDomain}/communities/${id}--${state}--${city}`
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
    `${webflowDomain}/floor-plans-and-models/${slug}--${community}--${state}--${city}`
  )
  const originalUrl = new URL(c.req.url)
  for (const [key, value] of originalUrl.searchParams) {
    url.searchParams.set(key, value)
  }
  return fetch(url)
})

app.get("/new-homes/:state/:city/:community/move-in-ready-homes/:address", async (c) => {
  const { state, city, community, address } = c.req.param()
  console.log(state, city, community, slug)

  //Get the communities from the webflow
  const url = new URL(
    `${webflowDomain}/floor-plans-and-models/${address}--${community}--${state}--${city}`
  )
  const originalUrl = new URL(c.req.url)
  for (const [key, value] of originalUrl.searchParams) {
    url.searchParams.set(key, value)
  }
  return fetch(url)
})

//Redirect to the procies urls if uses is using webflow url strucutre

//handle rediect to communities page
app.get("/communities/:slug", async (c) => {
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
app.get("/floor-plans-and-models/:slug", async (c) => {
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

app.get("/move-in-ready-homes/:slug", async (c) => {
  const { slug } = c.req.param()
  //get city and state from slug separated by "-"
  const [specAddress, community, state, city] = slug.split("--")
  console.log(specAddress, community, state, city)

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