import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial application with 3 args", () => {
  it("should correctly collect all values through a 3-argument partial pipeline", () => {
    const results: number[] = []
    let count = 0
    const values = [1, 2, 3]

    const source = (end: any, cb: any) => {
      if (end) return cb(end)
      if (count >= values.length) return cb(true)
      cb(null, values[count++])
    }

    const double = (read: any) => (end: any, cb: any) =>
      read(end, (e: any, d: any) => e ? cb(e) : cb(null, d * 2))

    const addOne = (read: any) => (end: any, cb: any) =>
      read(end, (e: any, d: any) => e ? cb(e) : cb(null, d + 1))

    const collectSink = (arr: number[]) => (read: any) => {
      const drain = () => read(null, (e: any, d: any) => {
        if (e) return
        arr.push(d)
        drain()
      })
      drain()
    }

    // 3-arg partial: triggers case 3 in the switch
    const pipeline = pull(double, addOne, collectSink(results))
    pipeline(source)

    // 1*2+1=3, 2*2+1=5, 3*2+1=7
    expect(results).toEqual([3, 5, 7])
  })
})