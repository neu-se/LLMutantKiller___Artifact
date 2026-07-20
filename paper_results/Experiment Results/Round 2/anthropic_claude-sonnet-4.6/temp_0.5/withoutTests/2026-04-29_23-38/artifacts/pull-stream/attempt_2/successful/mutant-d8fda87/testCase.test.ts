import once from "../../../../../../../../../../../subject_repositories/pull-stream/sources/once.js"

describe("once source abort behavior", () => {
  it("should not emit the value when aborted, instead ending the stream", () => {
    const source = once("hello");
    
    const results: any[] = [];
    
    // First, abort the source
    source(true, (err: any, val: any) => {
      results.push({ err, val });
    });
    
    // The callback should have been called with an error (abort), not with the value
    expect(results.length).toBe(1);
    expect(results[0].err).toBeTruthy();
    expect(results[0].val).toBeUndefined();
  });
});