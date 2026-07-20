import { drain } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js'

describe('drain', () => {
  it('should abort the stream when the callback returns false', (done) => {
    const read = drain((data) => {
      if (data === 3) {
        return false
      }
    }, (err) => {
      if (err) {
        done.fail(err)
      } else {
        done()
      }
    })

    read(null, (end, data) => {
      if (end) {
        done.fail('Stream ended unexpectedly')
      } else {
        read(null, (end, data) => {
          if (end) {
            done.fail('Stream ended unexpectedly')
          } else {
            read(null, (end, data) => {
              if (end) {
                done()
              } else {
                done.fail('Stream did not end as expected')
              }
            })
          }
        })
      }
    })

    read(null, (end, data) => {
      if (end) {
        done.fail('Stream ended unexpectedly')
      } else {
        read(null, (end, data) => {
          if (end) {
            done()
          } else {
            done.fail('Stream did not end as expected')
          }
        })
      }
    })
  })
})