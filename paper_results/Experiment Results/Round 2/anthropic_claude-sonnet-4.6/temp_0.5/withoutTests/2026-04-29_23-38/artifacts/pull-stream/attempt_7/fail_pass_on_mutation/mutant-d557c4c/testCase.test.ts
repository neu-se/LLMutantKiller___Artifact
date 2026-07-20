import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should use function return value as new read, ignoring source property", () => {
    function source(end: any, cb: Function) { cb(true) }
    
    const transformedRead = function(end: any, cb: Function) { cb(true) }
    const wrongRead = function(end: any, cb: Function) { cb(true) }
    
    const through = function(read: Function) {
      return transformedRead
    }
    ;(through as any).source = wrongRead
    
    const result = pull(source, through)
    
    // Both original and mutated: through is a function, read = through(source) = transformedRead
    // else-if skipped in both cases
    expect(result).toBe(transformedRead)
    expect(result).not.toBe(wrongRead)
  })
})