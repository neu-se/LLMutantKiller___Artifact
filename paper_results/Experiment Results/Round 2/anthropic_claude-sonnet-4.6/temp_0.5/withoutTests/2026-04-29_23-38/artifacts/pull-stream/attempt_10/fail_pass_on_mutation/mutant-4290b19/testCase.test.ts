import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull', () => {
  it('partial application with 5 through streams correctly captures all arguments', () => {
    const results: number[] = []
    let count = 0

    const source = (end: any, cb: Function) => {
      if (end || count >= 2) return cb(true)
      cb(null, ++count)
    }

    function addOne(read: Function) {
      return (end: any, cb: Function) => {
        read(end, (err: any, data: any) => {
          if (err) return cb(err)
          cb(null, data + 1)
        })
      }
    }

    function collectSink(read: Function) {
      const next = (end: any, data: any) => {
        if (end) return
        results.push(data)
        read(null, next)
      }
      read(null, next)
    }

    // Use partial application with exactly 5 through streams
    // This triggers the default case in the switch statement
    const partial = pull(addOne, addOne, addOne, addOne, addOne)
    pull(source, partial, collectSink)

    // 5 addOnes applied: 1+5=6, 2+5=7
    expect(results).toEqual([6, 7])
  })
})