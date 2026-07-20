import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should return transformed read function when through is applied to source", () => {
    const source = (end: any, cb: Function) => {
      if (end) return cb(end)
      cb(null, 10)
    }
    
    const double = (read: Function) => (end: any, cb: Function) => {
      read(end, (err: any, data: any) => {
        cb(err, err ? null : data * 2)
      })
    }
    
    const piped = pull(source, double)
    
    // Call the resulting stream to verify transformation was applied
    const results: number[] = []
    piped(null, (end: any, data: any) => {
      if (!end) results.push(data)
    })
    
    // Original: double(source) applied, piped reads doubled values → [20]
    // Mutated: double never applied, piped IS source, reads original values → [10]
    expect(results).toEqual([20])
  })
})