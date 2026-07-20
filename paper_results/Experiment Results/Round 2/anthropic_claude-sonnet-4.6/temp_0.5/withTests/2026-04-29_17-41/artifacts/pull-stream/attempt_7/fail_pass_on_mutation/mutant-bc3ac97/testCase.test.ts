const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js")

describe('pull curried form return value with 3 through-streams', () => {
  it('the result of applying a 3-stream pipeline to a source should equal direct pull application', (done) => {
    const results: number[] = []

    const makeCollector = (read: Function) => {
      return (abort: any, cb: Function) => {
        read(abort, (end: any, data: any) => {
          if (!end) results.push(data)
          cb(end, data)
        })
      }
    }

    const addOne = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data + 1)
      })
    }

    const double = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data * 2)
      })
    }

    // Use an object-style through stream as the 3rd argument
    // so that undefined being passed as 4th arg causes s.sink to throw
    const throughObj = {
      sink: (read: Function) => {
        throughObj.source = (abort: any, cb: Function) => {
          read(abort, (end: any, data: any) => {
            if (end) return cb(end)
            cb(null, data + 100)
          })
        }
      },
      source: null as any
    }

    // length === 3: pull(addOne, double, throughObj)
    const pipeline = pull(addOne, double, throughObj)

    let i = 0
    const source = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      if (i++ > 0) return cb(true)
      cb(null, 5)
    }

    const read = pipeline(source)

    read(null, (end: any, data: any) => {
      expect(end).toBeFalsy()
      // (5+1)*2 + 100 = 112
      expect(data).toBe(112)
      done()
    })
  })
})