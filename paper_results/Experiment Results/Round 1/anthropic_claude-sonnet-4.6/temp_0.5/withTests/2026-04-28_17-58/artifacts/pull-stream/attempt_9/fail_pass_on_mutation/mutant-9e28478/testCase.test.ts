import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull case 2 with sink as second argument', () => {
  it('should return undefined when partial pipeline ends with a sink', () => {
    let idx = 0
    const source = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      if (idx >= 3) return cb(true)
      cb(null, ++idx)
    }

    const through1 = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data * 2)
      })
    }

    // A sink: takes a read function, pulls all values, returns undefined
    const collected: number[] = []
    const sink = (read: Function) => {
      // pull all values
      const next = () => {
        read(null, (end: any, data: any) => {
          if (end) return
          collected.push(data)
          next()
        })
      }
      next()
      // returns undefined implicitly
    }
    // Ensure sink has length 1 so it's treated as a through by pull's partial detection
    Object.defineProperty(sink, 'length', { value: 1 })

    // pull(through1, sink) - length=2, both have length 1
    // a = through1, a.length === 1, so creates partial
    // Original case 2: return pull(read, ref[0], ref[1]) = pull(source, through1, sink)
    //   -> through1(source) then sink(through1(source)) -> sink returns undefined -> read = undefined
    //   -> returns undefined
    // Mutant case 3: return pull(read, ref[0], ref[1], ref[2]) = pull(source, through1, sink, undefined)
    //   -> through1(source) then sink(through1(source)) -> read = undefined
    //   -> then s=undefined, skipped -> returns undefined
    // Both return undefined... still equivalent

    // OK I need to find a case where ref[2] being undefined actually matters differently.
    // The ONLY way this can differ: if ref[1] is a function with length !== 1 that pull 
    // would treat differently when called with an extra undefined argument.
    
    // Actually: what if ref[1] itself has length 1? Then when pull processes the 4-arg call,
    // at i=2 it sees ref[1] (length 1, a function) -> read = ref[1](read)
    // at i=3 it sees undefined -> skipped
    // Same as 3-arg call. Still equivalent.

    // The mutation truly seems equivalent. But let me try the EXACT scenario from the test suite:
    // pull(map(...), sum(...)) - where sum is a sink
    
    const results: number[] = []
    let sumResult: number | null = null
    
    const mapDouble = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data * 2)
      })
    }

    // sum-like sink that calls done when stream ends  
    let doneCallback: ((err: any, val: number) => void) | null = null
    const sumSink = (done: (err: any, val: number) => void) => {
      const fn = (read: Function) => {
        let total = 0
        read(null, function next(end: any, data: any) {
          if (end) return done(end === true ? null : end, total)
          total += data
          read(null, next)
        })
      }
      Object.defineProperty(fn, 'length', { value: 1 })
      return fn
    }

    const onDone = jest.fn()
    const sum = sumSink(onDone)

    // pull(mapDouble, sum) triggers case 2 in partial application
    const pipeline = pull(mapDouble, sum)
    
    // Apply source - this should process [1,2,3] -> [2,4,6] -> sum=12
    idx = 0
    pipeline(source)

    expect(onDone).toHaveBeenCalledWith(null, 12)
  })
})