import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull', () => {
  it('partial application should not include undefined in the args array', () => {
    const callLog: unknown[] = []
    
    function trackingThrough(read: unknown) {
      callLog.push(read)
      if (typeof read !== 'function') {
        throw new TypeError(`Expected function but got ${typeof read}`)
      }
      return (end: any, cb: Function) => (read as Function)(end, cb)
    }
    
    let count = 0
    const source = (end: any, cb: Function) => {
      if (end || count >= 2) return cb(true)
      cb(null, ++count)
    }
    
    function sink(read: Function) {
      read(null, (end: any) => {})
    }
    
    // With mutation: args has extra undefined, passed to pull.apply in default case
    // pull then processes undefined as argument - skipped silently
    // But trackingThrough should only be called with valid functions
    const partial = pull(trackingThrough, trackingThrough, trackingThrough, trackingThrough, sink)
    pull(source, partial)
    
    expect(callLog).toHaveLength(4)
    expect(callLog.every(r => typeof r === 'function')).toBe(true)
  })
})