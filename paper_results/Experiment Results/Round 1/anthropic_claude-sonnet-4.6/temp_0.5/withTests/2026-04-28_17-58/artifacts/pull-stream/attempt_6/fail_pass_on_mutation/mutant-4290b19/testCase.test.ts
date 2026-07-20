import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull', () => {
  it('writable partial pipeline should only be callable once and produce correct output', (done) => {
    const add1 = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data + 1)
      })
    }

    // Create a writable partial pipeline (sink included)
    // When first arg has length 1, creates partial sink
    // The sink here is a function that collects values
    const collected: number[] = []
    
    const sink = (read: Function) => {
      const go = () => {
        read(null, (end: any, data: any) => {
          if (end) return
          collected.push(data)
          go()
        })
      }
      go()
    }

    // pull(add1, add1, add1, sink) - 4 args, first has length 1
    // Creates partial sink with length=4
    // Original args=[add1,add1,add1,sink], mutated args=[add1,add1,add1,sink,undefined]
    const writable = pull(add1, add1, add1, sink)

    // writable is a partial sink (function with length 1)
    // When called with a source, switch(4): pull(source, ref[0], ref[1], ref[2], ref[3])
    // Original: pull(source, add1, add1, add1, sink) - ref[3]=sink ✓
    // Mutated:  pull(source, add1, add1, add1, sink) - ref[3]=sink ✓ (undefined at ref[4], not accessed)
    // SAME RESULT

    let i = 0
    const source = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      if (i >= 3) return cb(true)
      cb(null, i++)
    }

    writable(source)

    setTimeout(() => {
      expect(collected).toEqual([3, 4, 5])
      done()
    }, 50)
  })
})