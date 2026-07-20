import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull', () => {
  it('should correctly handle partial application without adding undefined to the pipeline', () => {
    const callArgs: any[][] = []
    
    // Track what arguments each through receives
    function trackingThrough(read: Function) {
      callArgs.push([read])
      return (end: any, cb: Function) => read(end, cb)
    }
    
    let count = 0
    const source = (end: any, cb: Function) => {
      if (end || count >= 1) return cb(true)
      cb(null, ++count)
    }
    
    function sink(read: Function) {
      read(null, (end: any) => {})
    }
    
    // 5 args triggers default case
    const partial = pull(trackingThrough, trackingThrough, trackingThrough, trackingThrough, sink)
    pull(source, partial)
    
    // Each tracking through should receive a valid function, never undefined
    expect(callArgs.length).toBe(4)
    expect(callArgs.every(args => typeof args[0] === 'function')).toBe(true)
  })
})