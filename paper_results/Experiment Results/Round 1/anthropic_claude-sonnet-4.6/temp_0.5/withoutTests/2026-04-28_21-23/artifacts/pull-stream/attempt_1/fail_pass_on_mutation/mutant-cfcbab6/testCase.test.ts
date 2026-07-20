import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should correctly pipe a through function to a sink without hanging", (done) => {
    const values: number[] = [1, 2, 3]
    let index = 0
    
    const source = (end: any, cb: Function) => {
      if (end || index >= values.length) {
        cb(true, null)
      } else {
        cb(null, values[index++])
      }
    }
    
    const through = (read: Function) => (end: any, cb: Function) => {
      read(end, (err: any, data: any) => {
        cb(err, data)
      })
    }
    
    const results: number[] = []
    const sink = (read: Function) => {
      read(null, function next(end: any, data: any) {
        if (end) {
          expect(results).toEqual([1, 2, 3])
          done()
          return
        }
        results.push(data)
        read(null, next)
      })
    }
    
    pull(source, through, sink)
  }, 1000)
})