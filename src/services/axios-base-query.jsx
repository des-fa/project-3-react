import axios from 'axios'
import { renderErrors } from './_utils'

const axiosBaseQuery = ({ baseUrl } = { baseUrl: '' }) => async ({ url, noError, ...rest }) => {
  try {
    const result = await axios({ url: baseUrl + url, noError, ...rest })
    return { data: result.data }
  } catch (err) {
    // const err = axiosError
    if (!noError) renderErrors(err)
    console.log(err)
    return {
      error: { status: err.response?.status, data: err.response?.data }
    }
  }
}

export default axiosBaseQuery
