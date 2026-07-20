import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull', () => {
  it('applies each through stream exactly once when composing a pipeline', (done) => {
    let idx = 0
    const source = (abort: any, cb: Function) => {
      if (abort || idx >= 3) return cb(true)
      cb(null, idx++)
    }

    let mapCallCount = 0
    const mapThrough = (read: Function) => {
      mapCallCount++
      return (abort: any, cb: Function) => {
        read(abort, (end: any, data: any) => {
          if (end) return cb(end)
          cb(null, data + 1)
        })
      }
    }

    const results: number[] = []
    const sink = (read: Function) => {
      const loop = (end: any, data: any) => {
        if (end) {
          expect(mapCallCount).toBe(1)
          expect(results).toEqual([1, 2, 3])
          done()
          return
        }
        results.push(data)
        read(null, loop)
      }
      read(null, loop)
    }

    pull(source, mapThrough, sink)
  })
})