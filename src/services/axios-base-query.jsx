import axios from 'axios'

const axiosBaseQuery = ({ baseUrl } = { baseUrl: '' }) => async ({ url, ...rest }) => {
  try {
    const result = await axios({ url: baseUrl + url, ...rest })
    return { data: result.data }
  } catch (axiosError) {
    const err = axiosError
    return {
      error: { status: err.response?.status, data: err.response?.data }
    }
  }
}

export default axiosBaseQuery
