import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial application", () => {
  it("should return a function (not undefined) when partially applied with 3 args and then called", () => {
    // Test that partial application with 3 through functions works correctly
    // The mutation affects case 3/4 in the switch statement
    
    const collected: number[] = []
    
    const makeThrough = (n: number) => (read: Function) => (end: any, cb: Function) => {
      read(end, (err: any, data: any) => {
        if (err) return cb(err)
        cb(null, data + n)
      })
    }

    let count = 0
    const source = (end: any, cb: Function) => {
      if (end || count >= 1) return cb(true)
      count++
      cb(null, 0)
    }

    // Create partial with exactly 3 args (length === 3 in the partial closure)
    const partial = pull(makeThrough(1), makeThrough(10), makeThrough(100))
    
    // Apply partial to source - this triggers case 3 in the switch
    const piped = partial(source)
    
    // piped should be a readable function
    expect(typeof piped).toBe('function')
    
    // Read from it
    piped(null, (end: any, data: any) => {
      if (!end) collected.push(data)
    })
    
    // 0 + 1 + 10 + 100 = 111
    expect(collected).toEqual([111])
  })
})