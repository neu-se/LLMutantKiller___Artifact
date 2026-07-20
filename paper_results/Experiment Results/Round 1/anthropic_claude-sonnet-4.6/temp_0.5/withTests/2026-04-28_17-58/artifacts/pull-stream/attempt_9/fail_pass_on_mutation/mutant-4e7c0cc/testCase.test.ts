import { default as pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull', () => {
  it('partial sink with 3 args where last is a sink object returns undefined', () => {
    const through = (read: Function) => (abort: any, cb: Function) =>
      read(abort, (end: any, data: any) => end ? cb(end) : cb(null, data + 1))

    let sinkRead: Function | null = null
    const sink = {
      sink: (read: Function) => { sinkRead = read }
    }

    // 3 args: through, through, sink-object
    const partialSink = pull(through, through, sink as any)

    const source = (abort: any, cb: Function) => cb(true)
    const result = partialSink(source)

    // sink object has no .source, so pull returns undefined after calling sink.sink()
    expect(result).toBeUndefined()
    expect(sinkRead).not.toBeNull()
  })
})