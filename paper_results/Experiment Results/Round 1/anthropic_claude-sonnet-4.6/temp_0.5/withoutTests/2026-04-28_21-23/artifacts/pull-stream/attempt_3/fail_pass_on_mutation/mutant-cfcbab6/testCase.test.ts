import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should invoke sink when pulling from source through sink", () => {
    let sinkCalled = false
    
    const source = (end: any, cb: Function) => {
      cb(null, 1)
    }
    
    const sink = (read: Function) => {
      sinkCalled = true
      read(null, () => {})
    }
    
    pull(source, sink)
    expect(sinkCalled).toBe(true)
  })
})