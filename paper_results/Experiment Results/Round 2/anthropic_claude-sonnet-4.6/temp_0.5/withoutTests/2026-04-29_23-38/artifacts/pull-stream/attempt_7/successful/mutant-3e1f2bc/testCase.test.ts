import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should handle undefined through-stream gracefully", () => {
    const source = (end: any, cb: Function) => { cb(true) }
    
    // If read = s(read) runs with s=undefined: TypeError: undefined is not a function
    // If else if(true) runs with s=undefined: TypeError: Cannot read property 'sink' of undefined
    // If else if(s && typeof s === 'object') runs with s=undefined: false → skip
    
    // The question is: does the original throw or not?
    // If original has if(typeof s === 'function'): undefined is not a function → else-if
    //   else if(undefined && ...): false → skip → no throw
    // If mutated has else if(true): undefined.sink(read) → TypeError
    
    expect(() => pull(source, undefined as any)).not.toThrow()
  })
})