import {createStatus} from '../responses'

test('Creates status with defaults', () => {
  const status = createStatus()

  expect(status.status).toBe(200)
  expect(status.statusText).toBe('OK')
})
