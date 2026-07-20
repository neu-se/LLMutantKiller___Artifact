import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull', () => {
  it('partial application with 5 through streams applies all transforms correctly', () => {
    const results: number[] = []
    
    let count = 0
    const source = (end: any, cb: Function) => {
      if (end || count >= 3) return cb(true)
      cb(null, ++count)
    }
    
    function double(read: Function) {
      return (end: any, cb: Function) => {
        read(end, (err: any, data: any) => {
          if (err) return cb(err)
          cb(null, data * 2)
        })
      }
    }
    
    function collectSink(read: Function) {
      const next = (end: any, data: any) => {
        if (end) return
        results.push(data)
        read(null, next)
      }
      read(null, next)
    }
    
    const partial = pull(double, double, double, double, collectSink)
    pull(source, partial)
    
    expect(results).toEqual([16, 32, 48])
  })
})