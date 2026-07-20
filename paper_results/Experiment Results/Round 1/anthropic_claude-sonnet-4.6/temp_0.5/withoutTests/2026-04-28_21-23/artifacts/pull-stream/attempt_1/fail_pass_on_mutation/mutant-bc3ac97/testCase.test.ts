import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull with 2 through streams (case 2 in switch)", () => {
  it("should correctly pipe through 2 transform functions when called as a partial application", () => {
    // Create a simple through function that doubles values
    const double = (read: Function) => (end: any, cb: Function) => {
      read(end, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data * 2)
      })
    }

    // Create another through function that adds 1
    const addOne = (read: Function) => (end: any, cb: Function) => {
      read(end, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data + 1)
      })
    }

    // Create a source that emits values 1, 2, 3
    const values = [1, 2, 3]
    let index = 0
    const source = (end: any, cb: Function) => {
      if (end) return cb(end)
      if (index >= values.length) return cb(true)
      cb(null, values[index++])
    }

    // Create a partial pull with 2 through streams (this triggers case 2 in the switch)
    const pipeline = pull(double, addOne)

    // Apply the pipeline to the source
    const result = pipeline(source)

    const collected: number[] = []

    const drain = (read: Function) => {
      const next = () => {
        read(null, (end: any, data: any) => {
          if (end === true) return
          if (end) throw end
          collected.push(data)
          next()
        })
      }
      next()
    }

    drain(result)

    // double(1)+1=3, double(2)+1=5, double(3)+1=7
    expect(collected).toEqual([3, 5, 7])
  })
})