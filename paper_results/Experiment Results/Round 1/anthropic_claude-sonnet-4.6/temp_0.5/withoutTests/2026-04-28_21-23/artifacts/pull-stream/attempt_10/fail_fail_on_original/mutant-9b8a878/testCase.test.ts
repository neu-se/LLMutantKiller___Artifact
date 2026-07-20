import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should correctly handle partial application with sink objects", () => {
    const results: number[] = []
    
    const through = (read: Function) => (end: any, cb: Function) => read(end, cb)
    
    // Create a sink object with .sink and .source
    const throughObj = {
      sink: function(read: Function) {
        this.source = (end: any, cb: Function) => read(end, cb)
      },
      source: null as any
    }
    
    // throughObj has no .length property... wait
    // Actually objects don't have .length by default
    // So pull(throughObj) would check throughObj.length === 1
    // throughObj.length is undefined, undefined === 1 is false
    // So it would NOT enter the partial path
    
    // Let me add length: 1 to the object
    const throughObj2 = {
      length: 1,
      sink: function(this: any, read: Function) {
        this.source = (end: any, cb: Function) => read(end, cb)
      },
      source: null as any
    }
    
    // pull(throughObj2) - throughObj2.length === 1, enters partial path
    // length = 1, args = new Array(1) or new Array()
    // args[0] = throughObj2
    // Returns partial function
    // partial(source) -> switch(1): pull(source, ref[0]) = pull(source, throughObj2)
    // In pull: a=source (length=2), non-partial
    // s=throughObj2, typeof s === 'object', s.sink(source) called
    // throughObj2.source is set
    // read = throughObj2.source
    
    let i = 0
    const source = function(end: any, cb: Function) {
      if (end) return cb(end)
      if (i++ > 0) return cb(true)
      cb(null, 42)
    }
    
    const partial = pull(throughObj2)
    const stream = partial(source)
    
    let result: any
    stream(null, (err: any, data: any) => { if (!err) result = data })
    expect(result).toBe(42)
  })
})