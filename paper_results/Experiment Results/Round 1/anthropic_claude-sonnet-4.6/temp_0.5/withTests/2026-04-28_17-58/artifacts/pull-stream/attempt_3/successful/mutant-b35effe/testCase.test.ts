import pull from "../../../../../../../../../../../subject_repositories/pull-stream/index.js";

describe('find - stream ends with error', () => {
  it('should call callback with the actual error when stream ends with an error and no match was found', (done) => {
    const expectedError = new Error('stream error')

    pull(
      pull.error(expectedError),
      pull.find(
        (d: any) => d === 99,
        (err: any, result: any) => {
          expect(err).toBe(expectedError)
          expect(result).toBeNull()
          done()
        }
      )
    )
  })
})