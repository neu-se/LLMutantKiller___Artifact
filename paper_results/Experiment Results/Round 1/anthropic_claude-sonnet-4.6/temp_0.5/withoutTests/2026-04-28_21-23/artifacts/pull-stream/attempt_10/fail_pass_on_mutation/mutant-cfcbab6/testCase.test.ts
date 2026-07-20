import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should process streams such that data passes through all stages", () => {
    // Test with object-style duplex stream to exercise the s.sink/s.source branch
    const received: number[] = []
    
    let innerRead: Function
    
    const duplex = {
      sink: (read: Function) => {
        innerRead = read
      },
      source: (end: any, cb: Function) => {
        innerRead(end, (err: any, data: any) => {
          cb(err, err ? null : data + 100)
        })
      }
    }
    
    const source = (end: any, cb: Function) => {
      if (end) return cb(end)
      cb(null, 5)
    }
    
    const piped = pull(source, duplex)
    
    piped(null, (end: any, data: any) => {
      if (!end) received.push(data)
    })
    
    expect(received).toEqual([105])
  })
})