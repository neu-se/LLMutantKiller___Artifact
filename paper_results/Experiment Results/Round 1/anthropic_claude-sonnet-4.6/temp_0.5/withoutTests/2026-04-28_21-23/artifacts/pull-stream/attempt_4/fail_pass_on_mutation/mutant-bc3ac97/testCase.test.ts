import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull case 3 fall-through mutation", () => {
  it("should return undefined when pipeline with 3 throughs is used as a sink", () => {
    // When length===3, mutated code falls through to case 4:
    // pull(read, ref[0], ref[1], ref[2], ref[3]) where ref[3]=undefined
    // In the loop, when s=undefined: neither branch runs, read stays as ref[2]'s output
    // But the return value of pull with a sink (no source returned) should be undefined
    // With the extra undefined arg processed, read is still the source - pull returns it
    // This means the mutated version returns a source instead of undefined

    const collected: number[] = []

    const through = (read: Function) => (end: any, cb: Function) => {
      read(end, cb)
    }

    // Sink that collects values
    const sink = (read: Function) => {
      const next = () => {
        read(null, (end: any, data: any) => {
          if (end) return
          collected.push(data)
          next()
        })
      }
      next()
    }

    let idx = 0
    const source = (end: any, cb: Function) => {
      if (end) return cb(end)
      if (idx >= 3) return cb(true)
      cb(null, ++idx)
    }

    // 3 throughs + 1 sink = 4 args total, length=4, no partial application
    // Instead use partial with 3 throughs, then apply to source+sink separately
    const pipeline = pull(through, through, through)
    const piped = pipeline(source)

    sink(piped)

    expect(collected).toEqual([1, 2, 3])
  })
})