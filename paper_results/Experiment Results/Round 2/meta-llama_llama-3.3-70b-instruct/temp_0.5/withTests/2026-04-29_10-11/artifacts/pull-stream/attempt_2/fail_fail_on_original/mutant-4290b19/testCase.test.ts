import { pull } from '../pull.js'

describe('pull-stream', () => {
  it('should pass when using the original code and fail when using the mutated code', () => {
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
          var args = new Array(3)
          for (var i = 0; i < 3; i++) {
            args[i] = read
          }
          return function (read) {
            return pull.apply(null, args)
          }
        }
      )
    }).not.toThrow()

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