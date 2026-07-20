import { pull } from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull', () => {
  it('should handle the case when length is 3', () => {
    const read = pull(
      pull.values([1, 2, 3]),
      (read) => {
        return function (end, cb) {
          read(end, function (end, data) {
            if (end) cb(end)
            else cb(null, data)
          })
        }
      },
      (read) => {
        return function (end, cb) {
          read(end, function (end, data) {
            if (end) cb(end)
            else cb(null, data)
          })
        }
      },
      (read) => {
        return function (end, cb) {
          read(end, function (end, data) {
            if (end) cb(end)
            else cb(null, data)
          })
        }
      }
    )

    let result: any[] = []
    read(null, function (end, data) {
      if (end) {
        // pass
      } else {
        result.push(data)
      }
    })

    read(null, function (end, data) {
      if (end) {
        // pass
      } else {
        result.push(data)
      }
    })

    read(null, function (end, data) {
      if (end) {
        // pass
      } else {
        result.push(data)
      }
    })

    expect(result).toEqual([1, 2, 3])
  })
})