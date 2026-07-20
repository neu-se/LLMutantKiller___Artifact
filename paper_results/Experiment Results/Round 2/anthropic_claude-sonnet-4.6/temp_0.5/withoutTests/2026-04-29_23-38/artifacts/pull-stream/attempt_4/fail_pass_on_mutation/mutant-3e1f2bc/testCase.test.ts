import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should apply function through-streams to transform the read function", () => {
    let callCount = 0
    
    const source = (end: any, cb: Function) => {
      if (end) return cb(end)
      cb(null, ++callCount)
    }
    
    // Function-style through stream
    const through = (read: Function) => {
      return (end: any, cb: Function) => {
        read(end, (e: any, data: any) => {
          if (e) return cb(e)
          cb(null, data * 2)
        })
      }
    }
    
    const result = pull(source, through)
    
    const values: number[] = []
    result(null, (end: any, data: any) => {
      if (!end) values.push(data)
    })
    result(null, (end: any, data: any) => {
      if (!end) values.push(data)
    })
    
    expect(values).toEqual([2, 4])
  })
})