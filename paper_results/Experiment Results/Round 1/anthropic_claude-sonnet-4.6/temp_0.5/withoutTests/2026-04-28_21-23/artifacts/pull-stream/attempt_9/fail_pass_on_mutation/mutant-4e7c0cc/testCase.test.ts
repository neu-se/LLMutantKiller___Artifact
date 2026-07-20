import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should correctly compose streams using partial application with 3 arguments", () => {
    // Test that pull correctly handles the case 3 path in partial application
    // by verifying the pipeline produces correct results
    
    const results: number[] = []
    
    // Create a values source
    const values = (arr: number[]) => {
      let i = 0
      return (end: any, cb: Function) => {
        if (end || i >= arr.length) return cb(true)
        cb(null, arr[i++])
      }
    }
    
    // Create a map through
    const map = (fn: (x: number) => number) => (read: Function) => (end: any, cb: Function) => {
      read(end, (err: any, data: any) => {
        if (err) return cb(err)
        cb(null, fn(data))
      })
    }
    
    // Create a collect sink
    const collect = (arr: number[]) => {
      const sink = (read: Function) => {
        const next = () => {
          read(null, (end: any, data: any) => {
            if (end) return
            arr.push(data)
            next()
          })
        }
        next()
      }
      return sink
    }
    
    // Use partial application with exactly 3 args (map, map, collect_sink)
    // The 3rd arg is a sink, so pull returns undefined
    // This exercises the case 3 path
    const pipeline = pull(
      map(x => x * 2),
      map(x => x + 1),
      collect(results)
    )
    
    // pipeline is a partial sink - call it with a source
    pipeline(values([1, 2, 3]))
    
    expect(results).toEqual([3, 5, 7])
  })
})