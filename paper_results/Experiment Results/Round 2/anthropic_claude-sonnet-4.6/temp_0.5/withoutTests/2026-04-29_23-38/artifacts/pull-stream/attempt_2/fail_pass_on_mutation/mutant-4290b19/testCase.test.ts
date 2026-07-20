import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull', () => {
  it('partial application with 5 arguments should not include undefined in pipeline', () => {
    const undefinedEncountered: boolean[] = []
    
    let count = 0
    const source = (end: any, cb: Function) => {
      if (end || count >= 2) return cb(true)
      cb(null, ++count)
    }
    
    // A through that records if it received undefined as its read argument
    const makeSensitiveThrough = () => {
      return function sensitiveThrough(read: any) {
        if (read === undefined) undefinedEncountered.push(true)
        return (end: any, cb: Function) => read(end, cb)
      }
    }
    
    function collectSink(read: Function) {
      const next = (end: any, data: any) => {
        if (end) return
        read(null, next)
      }
      read(null, next)
    }
    
    // 5 arguments triggers default case
    const partial = pull(makeSensitiveThrough(), makeSensitiveThrough(), makeSensitiveThrough(), makeSensitiveThrough(), collectSink)
    pull(source, partial)
    
    expect(undefinedEncountered).toEqual([])
  })
})