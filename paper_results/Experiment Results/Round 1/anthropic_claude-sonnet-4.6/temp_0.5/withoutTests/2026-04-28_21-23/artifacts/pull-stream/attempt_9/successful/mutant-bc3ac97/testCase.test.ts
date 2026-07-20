import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull case 3 mutation detection", () => {
  it("does not access ref[3] when partial application has 3 through functions", () => {
    let extraFunctionCalled = false

    const originalDescriptor = Object.getOwnPropertyDescriptor(Array.prototype, '3')

    ;(Array.prototype as any)[3] = function(read: any) {
      extraFunctionCalled = true
      return read
    }

    try {
      const t1 = (read: Function) => (end: any, cb: Function) => read(end, cb)
      const t2 = (read: Function) => (end: any, cb: Function) => read(end, cb)
      const t3 = (read: Function) => (end: any, cb: Function) => read(end, cb)

      // Partial application with exactly 3 through functions triggers case 3 in switch
      const pipeline = pull(t1, t2, t3)
      const source = (end: any, cb: Function) => { cb(true) }

      // Call pipeline once - in mutated code, case 3 falls through to case 4
      // which accesses ref[3] = Array.prototype[3] = our function
      pipeline(source)

      expect(extraFunctionCalled).toBe(false)
    } finally {
      if (originalDescriptor) {
        Object.defineProperty(Array.prototype, '3', originalDescriptor)
      } else {
        delete (Array.prototype as any)[3]
      }
    }
  })
})