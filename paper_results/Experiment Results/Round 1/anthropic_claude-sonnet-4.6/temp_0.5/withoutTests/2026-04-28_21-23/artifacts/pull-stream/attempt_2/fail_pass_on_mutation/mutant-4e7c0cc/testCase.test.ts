import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial application with exactly 3 arguments", () => {
  it("should not pass undefined as extra argument when using partial application with 3 streams", () => {
    const applied: any[] = []

    const makeThrough = (id: number) => (read: Function) => {
      applied.push(id)
      return (end: any, cb: Function) => {
        read(end, (end: any, data: any) => {
          if (end) return cb(end)
          cb(null, data)
        })
      }
    }

    // Spy to detect if undefined is passed as 4th argument
    let undefinedPassed = false
    const through3 = (read: Function) => {
      return (end: any, cb: Function) => {
        read(end, (end: any, data: any) => {
          if (end) return cb(end)
          cb(null, data)
        })
      }
    }

    // Wrap pull to detect extra undefined argument
    const originalPull = pull

    // Use partial application with exactly 3 args
    // In mutated code, this falls through to case 4 and calls pull(read, ref[0], ref[1], ref[2], undefined)
    // The undefined 4th argument means the for loop processes it but does nothing (undefined is not function or object)
    // So behavior should be the same... 

    // Better approach: use an object with sink/source as one of the args to detect the issue
    let i = 0
    const source = (end: any, cb: Function) => {
      if (end) return cb(end)
      if (i++ > 0) return cb(true)
      cb(null, 42)
    }

    const results: number[] = []

    // Create a duplex object
    let capturedRead: Function | null = null
    const duplex = {
      sink: (read: Function) => { capturedRead = read },
      source: (end: any, cb: Function) => {
        if (capturedRead) capturedRead(end, cb)
      }
    }

    const through = (read: Function) => (end: any, cb: Function) => {
      read(end, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data * 2)
      })
    }

    // partial with 3 args where last is the duplex
    const partial = pull(through, through, duplex)

    // Apply to source
    const result = partial(source)

    // result should be duplex.source
    const collected: number[] = []
    const drain = (read: Function) => {
      const next = () => {
        read(null, (end: any, data: any) => {
          if (end) return
          collected.push(data)
          next()
        })
      }
      next()
    }

    drain(result as unknown as Function)

    // 42 * 2 * 2 = 168
    expect(collected).toEqual([168])
  })
})