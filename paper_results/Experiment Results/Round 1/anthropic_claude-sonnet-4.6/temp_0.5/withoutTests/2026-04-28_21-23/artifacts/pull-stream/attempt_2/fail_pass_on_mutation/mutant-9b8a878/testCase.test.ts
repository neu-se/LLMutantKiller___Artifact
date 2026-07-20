import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should correctly handle partial application with 5 through streams using default switch case", () => {
    // Create a through stream factory
    const makeAdder = (n: number) => (read: Function) => (end: any, cb: Function) => {
      read(end, (err: any, data: any) => {
        if (err) return cb(err)
        cb(null, data + n)
      })
    }

    // 5 through streams to trigger the default case
    const t1 = makeAdder(1)
    const t2 = makeAdder(2)
    const t3 = makeAdder(3)
    const t4 = makeAdder(4)
    const t5 = makeAdder(5)

    // partial application with 5 args - triggers default case
    const partial = pull(t1, t2, t3, t4, t5)
    
    let i = 0
    const values = [10]
    const source = (end: any, cb: Function) => {
      if (end) return cb(end)
      if (i >= values.length) return cb(true)
      cb(null, values[i++])
    }

    const result = partial(source)
    
    let output: number | null = null
    result(null, (err: any, data: any) => {
      if (!err) output = data
    })
    
    // 10 + 1 + 2 + 3 + 4 + 5 = 25
    expect(output).toBe(25)
  })
})