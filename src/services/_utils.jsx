import { toast } from 'react-toastify'

export const renderErrors = (err) => {
  // Console Log for debugging purposes
  console.log(err.response.data) // eslint-disable-line
  // console.log(err.response.data?.email)  // eslint-disable-line
  const error = err.response.data
  // console.log(Object.keys(error)[0])
  const msg = Object.values(error)[0]

  switch (err.response.status) {
    case 401: {
      toast.error('You are not authorized to view this')
      break
    }
    case 404: {
      toast.error('Entry not found')
      break
    }
    case 406: {
      toast.error(msg)
      break
    }
    default: {
      toast.error('Something is wrong with the server')
    }
  }
}
