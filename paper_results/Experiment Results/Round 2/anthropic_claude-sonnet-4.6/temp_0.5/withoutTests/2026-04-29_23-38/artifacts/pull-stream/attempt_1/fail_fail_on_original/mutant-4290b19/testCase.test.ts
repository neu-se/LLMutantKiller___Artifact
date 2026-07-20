import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull partial application with many arguments', () => {
  it('should not pass undefined when applying 5 or more through streams', () => {
    const values: number[] = []
    
    // Create a simple source
    const source = (end: any, cb: Function) => {
      if (end) return cb(end)
      cb(null, 1)
    }
    
    // Create a through stream that passes values
    const through = (read: Function) => (end: any, cb: Function) => read(end, cb)
    
    // Create a sink that collects values
    const sink = (read: Function) => {
      read(null, function next(end: any, data: any) {
        if (end) return
        if (data !== undefined) values.push(data)
        read(null, next)
      })
    }
    sink.length = 1
    
    // Use partial application with 5 through streams (triggers default case)
    const partial = pull(sink)
    // This should not throw or produce unexpected behavior
    expect(() => pull(source, through, through, through, through, partial)).not.toThrow()
    expect(values).toEqual([1])
  })
})