import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should connect object-style through streams via sink and source", () => {
    const log: string[] = []
    
    const source = (end: any, cb: Function) => {
      log.push('source called')
      cb(true)
    }
    
    let capturedRead: Function | null = null
    const objectThrough = {
      sink(read: Function) {
        log.push('sink called')
        capturedRead = read
      },
      source(end: any, cb: Function) {
        log.push('through.source called')
        if (capturedRead) capturedRead(end, cb)
        else cb(true)
      }
    }
    
    const sink = (read: Function) => {
      log.push('sink function called')
      read(null, (end: any) => {
        log.push('read callback')
      })
    }
    
    pull(source, objectThrough, sink)
    
    // In original: object through stream's sink should be called
    expect(log).toContain('sink called')
  })
})