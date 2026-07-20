import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js"

describe('values source with null/undefined array', () => {
  it('should call cb with error when array is null/falsy', () => {
    const source = values(null, undefined);
    const results: any[] = [];
    
    source(null, (err: any, val: any) => {
      results.push({ err, val });
    });
    
    // In the original code, when array is null/falsy, it immediately returns a function
    // that calls cb(true) (end of stream) when abort is falsy.
    // The source should have been called and cb should have been invoked with true (end).
    expect(results.length).toBe(1);
    expect(results[0].err).toBe(true);
  });
});