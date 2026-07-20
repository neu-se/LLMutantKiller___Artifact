import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull with object sink/source', () => {
  it('should handle object streams (with sink and source) without throwing', () => {
    // Create a simple through stream as an object with sink and source
    const values: number[] = []
    
    // Source function
    const source = (end: any, cb: Function) => {
      if (end) return cb(end)
      cb(null, 1)
    }
    
    // Through object with sink and source
    const through = {
      sink: (read: Function) => {
        through.source = (end: any, cb: Function) => {
          read(end, (err: any, data: any) => {
            if (err) return cb(err)
            cb(null, data * 2)
          })
        }
      },
      source: null as any
    }
    
    // This should work in original (object handled by else-if branch)
    // but fail in mutated (tries to call object as function)
    expect(() => {
      const result = pull(source, through)
    }).not.toThrow()
  })
})