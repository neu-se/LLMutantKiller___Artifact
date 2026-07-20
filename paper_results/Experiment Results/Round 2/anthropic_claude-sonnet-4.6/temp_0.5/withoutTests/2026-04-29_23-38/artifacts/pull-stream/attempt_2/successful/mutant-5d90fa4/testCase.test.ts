import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js"

describe('values source with null/undefined array', () => {
  it('should immediately end stream when array is null', () => {
    const source = values(null, undefined);
    const results: any[] = [];
    
    source(null, (err: any, val: any) => {
      results.push({ err, val });
    });
    
    // In the original code, when array is null/falsy, it returns a function
    // that calls cb(true) (end of stream) when abort is falsy.
    // So results should have one entry with err=true (end of stream).
    expect(results.length).toBe(1);
    expect(results[0].err).toBe(true);
  });
});