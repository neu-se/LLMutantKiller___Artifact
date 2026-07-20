import { pull } from '../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull-stream', () => {
  it('should throw an error when the mutated code is used', () => {
    expect(() => {
      pull(
        pull.values([1, 2, 3]),
        function (read) {
          return function (abort, cb) {
            read(abort, function (end, data) {
              if (end) cb(end)
              else cb(null, data)
            })
          }
        },
        function (read) {
          var args = new Array(4) // Simulate the mutated code
          for (var i = 0; i <= 3; i++) {
            args[i] = read
          }
          return function (read) {
            return pull.apply(null, args)
          }
        }
      )
    }).toThrow()
  })
})