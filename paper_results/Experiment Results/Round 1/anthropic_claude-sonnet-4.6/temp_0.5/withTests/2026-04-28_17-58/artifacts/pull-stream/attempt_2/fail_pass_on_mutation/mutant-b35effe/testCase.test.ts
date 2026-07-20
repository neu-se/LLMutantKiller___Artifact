import pull from "../../../../../../../../../../../subject_repositories/pull-stream/index.js";

describe('find - no match found', () => {
  it('should call callback with null error when stream ends normally without finding a match', (done) => {
    pull(
      pull.values([1, 2, 3, 4, 5]),
      pull.find(
        (d: number) => d === 99,
        (err: any, result: any) => {
          expect(err).toBeNull()
          expect(result).toBeNull()
          done()
        }
      )
    )
  })
})