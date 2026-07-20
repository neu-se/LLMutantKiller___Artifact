import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull', () => {
  it('chained partial application captures the correct number of through-streams', () => {
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

    // partial1 has length=5 (triggers default case in switch)
    const partial1 = pull(addOne, addOne, addOne, addOne, addOne)
    // Calling partial1 with addOne (length=1) triggers recursive partial application
    // Original: recursive pull gets 6 args -> partial2 captures 6 addOnes
    // Mutated: recursive pull gets 7 args (extra undefined) -> partial2 captures 7 addOnes
    const partial2 = partial1(addOne)
    // partial2(source) applies 6 (original) or 7 (mutated) addOnes
    const readFn = partial2(source)
    pull(readFn, collectSink)

    // Original: 6 addOnes: 1+6=7, 2+6=8
    // Mutated: 7 addOnes: 1+7=8, 2+7=9
    expect(results).toEqual([7, 8])
  })
})