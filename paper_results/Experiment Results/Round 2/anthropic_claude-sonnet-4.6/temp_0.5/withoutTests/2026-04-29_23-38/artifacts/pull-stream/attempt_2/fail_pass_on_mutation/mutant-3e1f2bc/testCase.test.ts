import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should handle object-style streams with sink and source properties correctly", () => {
    const results: number[] = []
    let i = 0
    const values = [1, 2, 3]

    const source = (end: any, cb: Function) => {
      if (end || i >= values.length) return cb(true)
      cb(null, values[i++])
    }

    // Object-style through stream that doubles values
    const throughObj = {
      sink: function(read: Function) {
        this._read = read
      },
      source: function(end: any, cb: Function) {
        this._read(end, (end: any, data: any) => {
          if (end) return cb(end)
          cb(null, data * 2)
        })
      }
    }
    // Make source a bound method
    const through = {
      sink(read: Function) { (through as any)._read = read },
      source(end: any, cb: Function) {
        (through as any)._read(end, (e: any, data: any) => {
          if (e) return cb(e)
          cb(null, data * 2)
        })
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