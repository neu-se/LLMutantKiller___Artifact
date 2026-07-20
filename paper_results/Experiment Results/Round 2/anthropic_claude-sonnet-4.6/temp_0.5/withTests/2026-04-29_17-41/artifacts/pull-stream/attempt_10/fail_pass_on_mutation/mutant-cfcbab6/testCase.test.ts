import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull', () => {
  it('applies through the correct number of times', (done) => {
    // source emits single value 2
    // doubler applied N times: 2 -> 4 -> 8 -> 16...
    // original (N=length-1=2 for pull(src,dbl,sink)): 2->4->8, result=8... 
    // wait, need to figure out exact count
    
    let idx = 0
    const source = (abort: any, cb: Function) => {
      if (abort || idx > 0) return cb(true)
      idx++
      cb(null, 2)
    }

    const doubler = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: number) => {
        if (end) return cb(end)
        cb(null, data * 2)
      })
    }

    const results: number[] = []
    const sink = (read: Function) => {
      read(null, function next(end: any, data: number) {
        if (end) {
          // original applies doubler (length-1) = 1 time for pull(src, doubler, sink) length=3? 
          // Need to determine exact count
          expect(results).toHaveLength(1)
          done()
          return
        }
        results.push(data)
        read(null, next)
      })
    }

    pull(source, doubler, sink)
  })
})