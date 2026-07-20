import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull partial application switch cases', () => {
  it('case 2: partial with 2 throughs correctly applies both', (done) => {
    let idx = 0
    const source = (abort: any, cb: Function) => {
      if (abort || idx >= 3) return cb(true)
      cb(null, idx++)
    }

    const addOne = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: number) => {
        if (end) return cb(end)
        cb(null, data + 1)
      })
    }

    const double = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: number) => {
        if (end) return cb(end)
        cb(null, data * 2)
      })
    }

    // partial: pull(addOne, double) returns a function with length 1
    const pipeline = pull(addOne, double)
    
    const results: number[] = []
    const read = pull(source, pipeline)
    
    const drain = (end: any, data: number) => {
      if (end) {
        expect(results).toEqual([2, 4, 6])
        done()
        return
      }
      results.push(data)
      read(null, drain)
    }
    read(null, drain)
  })
})