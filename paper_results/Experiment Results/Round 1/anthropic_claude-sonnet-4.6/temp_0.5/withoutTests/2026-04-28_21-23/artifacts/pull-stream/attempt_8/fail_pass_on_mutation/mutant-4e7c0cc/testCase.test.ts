import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("each through function in a 3-arg partial should be called exactly once", () => {
    const callCounts = [0, 0, 0]
    
    const makeThrough = (i: number) => {
      const fn = (read: Function) => {
        callCounts[i]++
        return (end: any, cb: Function) => read(end, cb)
      }
      return fn
    }
    
    let done = false
    const source = (end: any, cb: Function) => {
      if (end || done) return cb(true)
      done = true
      cb(null, 42)
    }
    
    const partial = pull(makeThrough(0), makeThrough(1), makeThrough(2))
    const piped = partial(source)
    
    const results: number[] = []
    piped(null, (end: any, data: any) => {
      if (!end) results.push(data)
    })
    
    expect(callCounts).toEqual([1, 1, 1])
    expect(results).toEqual([42])
  })
})