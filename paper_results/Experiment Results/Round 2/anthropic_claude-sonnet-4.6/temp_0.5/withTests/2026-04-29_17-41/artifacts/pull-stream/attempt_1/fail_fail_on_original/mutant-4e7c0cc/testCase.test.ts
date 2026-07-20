import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull partial pipeline with 3 through-streams', () => {
  it('should correctly process data through a partial pipeline of 3 through-streams', (done) => {
    const map = (fn: (x: number) => number) => (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: number) => {
        if (end) cb(end)
        else cb(null, fn(data))
      })
    }

    const partial = pull(map((x) => x + 1), map((x) => x * 2), map((x) => x - 3))
    
    expect(typeof partial).toBe('function')
    expect(partial.length).toBe(1)
    
    const results: number[] = []
    const source = pull.values([1, 2, 3])
    const read = partial(source)
    
    const collect = (cb: (err: any, arr: number[]) => void) => {
      const arr: number[] = []
      const next = (end: any, data: number) => {
        if (end === true) return cb(null, arr)
        if (end) return cb(end, arr)
        arr.push(data)
        read(null, next)
      }
      read(null, next)
    }
    
    collect((err, arr) => {
      expect(err).toBeFalsy()
      expect(arr).toEqual([(1+1)*2-3, (2+1)*2-3, (3+1)*2-3])
      done()
    })
  })
})