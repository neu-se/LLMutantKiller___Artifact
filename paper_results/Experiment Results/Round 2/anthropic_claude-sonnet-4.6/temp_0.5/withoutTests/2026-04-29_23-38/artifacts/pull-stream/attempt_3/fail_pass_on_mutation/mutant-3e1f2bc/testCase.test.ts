import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should correctly pipe through an object-style stream with sink and source", () => {
    const results: number[] = []
    let i = 0
    const values = [1, 2, 3]

    const source = (end: any, cb: Function) => {
      if (end || i >= values.length) return cb(true)
      cb(null, values[i++])
    }

    let capturedRead: Function
    const through = {
      sink(read: Function) { capturedRead = read },
      get source() {
        return (end: any, cb: Function) => {
          capturedRead(end, (e: any, data: any) => {
            if (e) return cb(e)
            cb(null, data * 2)
          })
        }
      }
    }

    const sink = (read: Function) => {
      const next = (end: any, data: any) => {
        if (end) return
        results.push(data)
        read(null, next)
      }
      read(null, next)
    }

    pull(source, through, sink)
    expect(results).toEqual([2, 4, 6])
  })
})