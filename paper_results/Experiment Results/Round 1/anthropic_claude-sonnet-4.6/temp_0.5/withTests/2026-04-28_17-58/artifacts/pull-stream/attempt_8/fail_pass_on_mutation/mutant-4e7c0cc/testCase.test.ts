import { default as pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull', () => {
  it('partial sink with 3 through functions: calling it twice throws TypeError', () => {
    const through = (read: Function) => (abort: any, cb: Function) =>
      read(abort, (end: any, data: any) => end ? cb(end) : cb(null, data))

    const partialSink = pull(through, through, through)

    const source = (abort: any, cb: Function) => cb(true)

    partialSink(source)

    expect(() => partialSink(source)).toThrow(TypeError)
  })
})