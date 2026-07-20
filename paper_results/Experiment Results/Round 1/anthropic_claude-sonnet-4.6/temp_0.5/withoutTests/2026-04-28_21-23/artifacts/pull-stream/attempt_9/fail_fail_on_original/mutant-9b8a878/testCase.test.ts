import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should initialize args array with correct length argument", () => {
    const arraySpy = jest.spyOn(global, 'Array' as any)
    
    const through = (read: Function) => (end: any, cb: Function) => read(end, cb)
    
    // Reset call tracking
    arraySpy.mockClear()
    
    // Call pull with 3 through streams (length=3)
    pull(through, through, through)
    
    // Original: Array(3) should have been called
    // Mutated: Array() should have been called (no args)
    const arrayCallsWithArgs = arraySpy.mock.calls.filter(call => call.length > 0)
    expect(arrayCallsWithArgs).toContainEqual([3])
    
    arraySpy.mockRestore()
  })
})