import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull', () => {
  it('should handle the case when length is 3', (done) => {
    pull(
      pull.values([1, 2, 3]),
      (read) => {
        return pull(
          read,
          (read) => {
            return pull(
              read,
              (read) => {
                return read
              }
            )
          }
        )
      },
      (read) => {
        let result = []
        read(null, (end, data) => {
          if (end) {
            expect(result).toEqual([1, 2, 3])
            done()
          } else {
            result.push(data)
            read(null, (end, data) => {
              if (end) {
                expect(result).toEqual([1, 2, 3])
                done()
              } else {
                result.push(data)
                read(null, (end, data) => {
                  if (end) {
                    expect(result).toEqual([1, 2, 3])
                    done()
                  } else {
                    result.push(data)
                  }
                })
              }
            })
          }
        })
      }
    )
  })
})