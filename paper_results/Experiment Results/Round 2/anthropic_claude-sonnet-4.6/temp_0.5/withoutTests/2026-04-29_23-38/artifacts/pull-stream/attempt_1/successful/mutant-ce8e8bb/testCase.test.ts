import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull with object stream", () => {
  it("should correctly handle object streams with sink and source properties", () => {
    // Create a simple source that produces values
    const source = (end: any, cb: Function) => {
      cb(true) // immediately end
    }

    // Create a through stream as an object with sink and source
    let capturedRead: any = null
    const throughStream = {
      sink: (read: any) => {
        capturedRead = read
      },
      source: (end: any, cb: Function) => {
        capturedRead(end, cb)
      }
    }

    // In original: object streams are handled by the else-if branch
    // In mutated: if(true) means it tries to call the object as a function, throwing TypeError
    expect(() => {
      const result = pull(source, throughStream)
      // Call the result to trigger any lazy errors
      result(null, () => {})
    }).not.toThrow()
  })
})