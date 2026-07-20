import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should handle partial application where args array length matters for spread/apply", () => {
    // Create through streams - each has .length === 1
    const makeThrough = (transform: (x: number) => number) => 
      (read: Function) => (end: any, cb: Function) => 
        read(end, (err: any, data: any) => err ? cb(err) : cb(null, transform(data)))

    const double = makeThrough(x => x * 2)
    const addOne = makeThrough(x => x + 1)
    const triple = makeThrough(x => x * 3)
    const square = makeThrough(x => x * x)
    const negate = makeThrough(x => -x)

    // 5 args triggers default case: ref.unshift(read) then pull.apply(null, ref)
    const partial = pull(double, addOne, triple, square, negate)
    
    let i = 0
    const source = (end: any, cb: Function) => {
      if (end) return cb(end)
      if (i++ > 0) return cb(true)
      cb(null, 2)
    }
    
    // 2 -> *2=4 -> +1=5 -> *3=15 -> ^2=225 -> negate=-225
    let result: number | null = null
    const stream = partial(source)
    stream(null, (err: any, data: any) => { if (!err) result = data })
    expect(result).toBe(-225)
  })
})