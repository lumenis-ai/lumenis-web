import process from 'node:process'

export default defineEventHandler(async () => {
  try {
    const data = await $fetch.raw<{
      data: Array<OpenRouterModelData>
    }>('/models/user', {
      baseURL: process.env.AI_OPEN_ROUTER_BASE_URL,
      headers: {
        Authorization: `Bearer ${process.env.AI_OPEN_ROUTER_API_KEY}`,
      },
      method: 'GET',
    })

    return (data._data?.data ?? [])
      .filter(model => Object.values(model.pricing).every(value => !value || !Number(value)))
  }
  catch (e) {
    console.error(e)

    return []
  }
})
