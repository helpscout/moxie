import {StatusResponse} from './types'

export const createStatus = (
  status: number = 200,
  data: any = {},
  statusText: string = 'OK',
): StatusResponse => ({
  status,
  statusText,
  data,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const createStatus200 = (data: any): StatusResponse =>
  createStatus(200, data, 'OK')

export const createStatus400 = (data?: any): StatusResponse =>
  createStatus(400, data, 'Bad Request')
