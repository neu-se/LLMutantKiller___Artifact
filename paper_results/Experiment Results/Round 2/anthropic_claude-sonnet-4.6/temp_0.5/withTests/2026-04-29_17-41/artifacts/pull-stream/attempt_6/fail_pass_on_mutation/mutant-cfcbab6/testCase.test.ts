import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull', () => {
  it('sink is actually invoked when pull pipeline is assembled', (done) => {
    const source = (abort: any, cb: Function) => {
      cb(true) // immediately end
    }

    let sinkInvoked = false
    const sink = (read: Function) => {
      sinkInvoked = true
      read(null, (end: any) => {
        expect(sinkInvoked).toBe(true)
        done()
      })
    }

    pull(source, sink)
  })
})