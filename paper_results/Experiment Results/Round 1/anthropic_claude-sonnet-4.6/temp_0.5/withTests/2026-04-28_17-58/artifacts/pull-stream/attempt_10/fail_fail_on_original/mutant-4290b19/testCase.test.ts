import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull', () => {
  it('writable partial pipeline should correctly drain a source', (done) => {
    const results: number[] = []
    
    const add1 = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data + 1)
      })
    }

    const collect = (read: Function) => {
      const go = () => read(null, (end: any, data: any) => {
        if (end === true) { expect(results).toEqual([4, 5, 6]); done(); return }
        if (end) { done(end); return }
        results.push(data)
        go()
      })
      go()
    }

    // pull(add1, add1, add1, collect): length=4, first arg length 1 -> partial sink
    // args=[add1,add1,add1,collect] (original) or [add1,add1,add1,collect,undefined] (mutated)
    const writable = pull(add1, add1, add1, collect)

    let i = 0
    const source = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      if (i >= 3) return cb(true)
      cb(null, i++)
    }

    writable(source)
  })
})