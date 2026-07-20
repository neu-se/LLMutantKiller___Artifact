import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull with 5+ arguments in partial application", () => {
  it("should correctly apply read when using partial application with 5 or more through functions", () => {
    // Create a simple source that emits values 1, 2, 3 then ends
    const source = (end: any, cb: Function) => {
      if (end) return cb(end)
      const values = [1, 2, 3]
      let i = 0
      const read = (end: any, cb: Function) => {
        if (end) return cb(end)
        if (i >= values.length) return cb(true)
        cb(null, values[i++])
      }
      // Replace source with stateful reader
      return read
    }

    // Create a simple through that adds a value
    const makeThrough = (add: number) => (read: Function) => (end: any, cb: Function) => {
      read(end, (err: any, data: any) => {
        if (err) return cb(err)
        cb(null, data + add)
      })
    }

    // Collect results
    const results: number[] = []
    
    // Create a stateful source
    let idx = 0
    const values = [1, 2, 3]
    const simpleSource = (end: any, cb: Function) => {
      if (end) return cb(end)
      if (idx >= values.length) return cb(true)
      cb(null, values[idx++])
    }

    // Create a sink that collects values
    const collected: number[] = []
    const sink = (read: Function) => {
      const drain = () => {
        read(null, (end: any, data: any) => {
          if (end) return
          collected.push(data)
          drain()
        })
      }
      drain()
    }

    // Use partial application with 5 through functions (triggers default case)
    const partialSink = pull(
      makeThrough(1),
      makeThrough(1),
      makeThrough(1),
      makeThrough(1),
      makeThrough(1)
    )

    // Apply the partial sink with source
    partialSink(simpleSource)

    // The result should be a read function (through chain applied to source)
    // Let's verify it works by collecting
    const finalRead = pull(simpleSource, makeThrough(1), makeThrough(1), makeThrough(1), makeThrough(1), makeThrough(1))
    
    const results2: number[] = []
    let idx2 = 0
    const values2 = [10, 20, 30]
    const source2 = (end: any, cb: Function) => {
      if (end) return cb(end)
      if (idx2 >= values2.length) return cb(true)
      cb(null, values2[idx2++])
    }

    // partial with 5 args, first arg has length 1
    const partial5 = pull(makeThrough(10), makeThrough(10), makeThrough(10), makeThrough(10), makeThrough(10))
    const piped = partial5(source2)

    const output: number[] = []
    const drain = (read: Function) => {
      const go = () => {
        read(null, (end: any, data: any) => {
          if (end) return
          output.push(data)
          go()
        })
      }
      go()
    }

    drain(piped)
    // Each value gets +10 five times = +50
    expect(output).toEqual([60, 70, 80])
  })
})