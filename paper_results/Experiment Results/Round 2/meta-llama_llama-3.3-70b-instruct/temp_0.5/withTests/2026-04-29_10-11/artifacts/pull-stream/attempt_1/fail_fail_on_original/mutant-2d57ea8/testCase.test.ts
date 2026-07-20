import { pull } from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull-stream', () => {
  it('should throw an error with a message when called twice', () => {
    const stream = pull(
      (read: any) => read,
      (read: any) => read
    )

    expect(() => {
      stream((read: any) => read)
      stream((read: any) => read)
    }).toThrowError('partial sink should only be called once!')
  })
})