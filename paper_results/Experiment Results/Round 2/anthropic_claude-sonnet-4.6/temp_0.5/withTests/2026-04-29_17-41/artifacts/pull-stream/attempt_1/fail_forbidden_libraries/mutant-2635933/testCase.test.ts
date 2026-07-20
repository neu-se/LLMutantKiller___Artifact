import { describe, it, expect } from '@jest/globals'
import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull with duplex stream object', () => {
  it('should correctly pipe through a duplex stream object with source and sink properties', (done) => {
    // Create a simple duplex stream object (has both source and sink)
    // This tests the `else if (s && typeof s === 'object')` branch in pull.js
    const results: number[] = []
    
    // Create a through-stream as an object with source and sink
    function makeDuplex() {
      let _read: Function
      
      const duplex = {
        sink: function(read: Function) {
          _read = read
        },
        source: function(abort: any, cb: Function) {
          _read(abort, function(end: any, data: any) {
            if (end) return cb(end)
            cb(null, data * 2) // double the values
          })
        }
      }
      
      return duplex
    }
    
    // Create a simple source
    const values = [1, 2, 3]
    let i = 0
    const source = function(abort: any, cb: Function) {
      if (abort) return cb(abort)
      if (i >= values.length) return cb(true)
      cb(null, values[i++])
    }
    
    // Create a simple sink (drain)
    let ended = false
    const sink = function(read: Function) {
      function next() {
        read(null, function(end: any, data: any) {
          if (end) {
            ended = true
            expect(results).toEqual([2, 4, 6])
            done()
            return
          }
          results.push(data)
          next()
        })
      }
      next()
    }
    
    const duplex = makeDuplex()
    
    // In original code: the object branch handles duplex correctly
    // In mutated code: the object branch is skipped for objects, so duplex won't work
    pull(source, duplex, sink)
  })
})