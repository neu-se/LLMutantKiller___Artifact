import values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe("values source", () => {
  it("should not invoke onAbort callback when creating a source from a valid array", () => {
    const onAbortCalls: any[] = [];
    const onAbort = (err: any) => { onAbortCalls.push(err); };
    
    // Just creating the source - onAbort should NOT be called
    values([1, 2, 3], onAbort);
    
    expect(onAbortCalls.length).toBe(0);
  });
});