import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull', () => {
  it('should not pass undefined as a stream argument in partial application default case', () => {
    const callLog: any[] = []
    
    let count = 0
    const source = (end: any, cb: Function) => {
      if (end || count >= 2) return cb(true)
      cb(null, ++count)
    }
    
    function makeThroughThatLogs(id: number) {
      function through(read: any) {
        callLog.push(read)
        if (read === undefined) throw new Error(`through${id} called with undefined`)
        return (end: any, cb: Function) => read(end, cb)
      }
      return through
    }
    
    function collectSink(read: Function) {
      const next = (end: any, data: any) => {
        if (end) return
        read(null, next)
      }
      read(null, next)
    }
    
    // 5 args triggers default case; with mutation, undefined is appended to ref
    // and passed to pull.apply, where it's encountered as argument[6]
    // but it's skipped in the loop since typeof undefined !== 'function'
    const partial = pull(
      makeThroughThatLogs(1),
      makeThroughThatLogs(2),
      makeThroughThatLogs(3),
      makeThroughThatLogs(4),
      collectSink
    )
    pull(source, partial)
    
    // Each through should be called exactly once with a valid read function
    expect(callLog.every(r => typeof r === 'function')).toBe(true)
    expect(callLog).toHaveLength(4)
  })
})