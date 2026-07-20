import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull', () => {
  it('should not call through functions with undefined', () => {
    const source = (abort: any, cb: Function) => cb(true)
    const receivedArgs: any[] = []
    
    const through = (read: any) => {
      receivedArgs.push(read)
      return (abort: any, cb: Function) => read(abort, cb)
    }
    
    pull(source, through)
    
    expect(receivedArgs).toHaveLength(1)
    expect(receivedArgs[0]).not.toBeUndefined()
  })
})