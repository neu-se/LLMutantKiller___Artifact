import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull function', () => {
  it('should not throw an error when called with a function and an object', () => {
    const read = {
      source: function() {
        return 'source'
      }
    }
    const sink = function(read) {
      return read
    }
    const obj = {
      sink: function(read) {
        return read
      },
      source: function() {
        return 'source'
      }
    }
    expect(() => pull(sink, obj)).not.toThrow()
  })
})