import { pull } from '../../../pull.js'

describe('pull', () => {
  it('should throw an error when called with a partial sink that is called more than once', () => {
    const args = [function (read: any) { return read }, function (read: any) { return read }]
    const partialSink = pull(...args)

    expect(() => {
      pull(partialSink)
    }).toThrow(TypeError)
  })
})