import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull with 3 through streams as partial application", () => {
  it("should correctly pipe through exactly 3 transform functions", () => {
    const addOne = (read: Function) => (end: any, cb: Function) => {
      read(end, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data + 1)
      })
    }

    const double = (read: Function) => (end: any, cb: Function) => {
      read(end, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data * 2)
      })
    }

    const negate = (read: Function) => (end: any, cb: Function) => {
      read(end, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, -data)
      })
    }

    // This creates a partial application with length === 3, triggering case 3
    const pipeline = pull(addOne, double, negate)

    const values = [1, 2, 3]
    let index = 0
    const source = (end: any, cb: Function) => {
      if (end) return cb(end)
      if (index >= values.length) return cb(true)
      cb(null, values[index++])
    }

    const result = pipeline(source)

    const collected: number[] = []
    let done = false

    const next = () => {
      result(null, (end: any, data: any) => {
        if (end === true) { done = true; return }
        if (end) throw end
        collected.push(data)
        next()
      })
    }
    next()

    expect(done).toBe(true)
    // addOne(1)=2, double(2)=4, negate(4)=-4
    // addOne(2)=3, double(3)=6, negate(6)=-6
    // addOne(3)=4, double(4)=8, negate(8)=-8
    expect(collected).toEqual([-4, -6, -8])
  })
})