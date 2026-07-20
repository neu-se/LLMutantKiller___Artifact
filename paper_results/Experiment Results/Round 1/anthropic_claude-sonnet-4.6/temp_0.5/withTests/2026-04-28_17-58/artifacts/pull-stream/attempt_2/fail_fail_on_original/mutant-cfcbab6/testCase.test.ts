import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull', () => {
  it('pipeline with through that errors on undefined', (done) => {
    // Make a through that throws if called with undefined
    const safeThrough = (read: any) => {
      if (read === undefined) throw new Error('read is undefined!')
      return (abort: any, cb: Function) => read(abort, cb)
    }
    
    // With pull(source, safeThrough, collect):
    // length = 3
    // i=1: s=safeThrough (function), read = safeThrough(source_read) ✓
    // i=2: s=collect_fn (function), read = collect_fn(through_read) 
    // i=3 (mutated only): s=undefined, NOT a function, nothing happens
    // So safeThrough is never called with undefined
    // The mutation is still undetectable here
    
    pull(
      pull.values([1, 2, 3]),
      safeThrough,
      pull.collect((err: Error | null, arr: number[]) => {
        expect(err).toBeNull()
        expect(arr).toEqual([1, 2, 3])
        done()
      })
    )
  })
})