import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial application with 4 arguments", () => {
  it("should correctly compose 4 through functions via partial application", () => {
    const results: number[] = []

    const add = (n: number) => (read: Function) => (end: any, cb: Function) => {
      read(end, (err: any, data: any) => {
        if (err) return cb(err)
        cb(null, data + n)
      })
    }

    let done = false
    const source = (end: any, cb: Function) => {
      if (end || done) return cb(true)
      done = true
      cb(null, 0)
    }

    // Partial with exactly 4 args - triggers case 4 in switch
    const partial = pull(add(1), add(10), add(100), add(1000))
    const piped = partial(source)

    piped(null, (end: any, data: any) => {
      if (!end) results.push(data)
    })

    // 0 + 1 + 10 + 100 + 1000 = 1111
    expect(results).toEqual([1111])
  })
})