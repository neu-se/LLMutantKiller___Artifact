import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial application", () => {
  it("should correctly handle the args array in partial application", () => {
    // The mutation adds args[length] = undefined, making args.length = length+1
    // For the default case, this causes pull.apply to receive an extra undefined
    // We verify by checking the pipeline produces correct results
    
    const results: number[] = []
    let count = 0
    
    const source = (end: any, cb: Function) => {
      if (end) return cb(end)
      if (count >= 2) return cb(true)
      cb(null, ++count)
    }
    
    const addOne = (read: Function) => (end: any, cb: Function) => {
      read(end, (err: any, data: any) => {
        if (err) return cb(err)
        cb(null, data + 1)
      })
    }
    
    // 5 throughs triggers default case
    // In mutated code, pull.apply gets extra undefined arg
    // but it's silently skipped, so results should be same
    const partial = pull(addOne, addOne, addOne, addOne, addOne)
    const pipeline = partial(source)
    
    const drain = () => {
      pipeline(null, (end: any, data: any) => {
        if (end === true) return
        if (end) throw end
        results.push(data)
        drain()
      })
    }
    drain()
    
    expect(results).toEqual([6, 7])
  })
})