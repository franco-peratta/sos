const domain = "http://localhost:3001/api/v1"

const headers = {
  "Content-Type": "application/json"
}

export const http = async (
  url: string,
  options: RequestInit = {},
  retries: number = 0
): Promise<Response> => {
  try {
    const response = await fetch(`${domain}${url}`, { headers, ...options })
    if (!response.ok) {
      throw new Error(`Fetch error: ${response.status} ${response.statusText}`)
    }
    return response
  } catch (error: any) {
    if (retries <= 0) {
      throw new Error(`Fetch error: ${error.message}`)
    }
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return http(url, options, retries - 1)
  }
}
