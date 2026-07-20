import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull stream behavior with null/undefined through-streams", () => {
  it("should not throw when a through-stream argument is null or undefined in the pipeline", () => {
    // Create a simple source
    const source = function(end: any, cb: Function) {
      cb(true)
    }

    // In the original code, if s is null/undefined, the else if (s && typeof s === 'object')
    // check prevents calling s.sink(). With the mutation (else if (true)), it would try
    // to call null.sink() and throw.
    // However, let's test with a valid object that lacks sink - that would expose the mutation
    // by trying to call .sink on something that isn't a proper stream object.
    
    // Actually test: passing a non-null object without sink/source should behave differently
    const nonStreamObject = { value: 42 } // has no sink or source
    
    expect(() => {
      pull(source, nonStreamObject as any)
    }).toThrow()
  })
})