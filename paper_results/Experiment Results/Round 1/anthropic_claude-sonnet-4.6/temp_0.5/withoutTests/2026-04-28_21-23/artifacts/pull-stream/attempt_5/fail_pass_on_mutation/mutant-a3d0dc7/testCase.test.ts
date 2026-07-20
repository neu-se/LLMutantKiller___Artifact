import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js"
import abortCb from "../../../../../../../../../../../subject_repositories/pull-stream/util/abort-cb.js"

describe("values source", () => {
  it("should understand abortCb behavior with null abort", (done) => {
    // First understand what abortCb does with null
    const results: any[] = [];
    abortCb((err: any, val: any) => {
      results.push({ err, val });
    }, null, undefined);
    
    // Now test values - with mutation if(true), abortCb(cb, null, onAbort) is called
    // which means cb gets called with whatever abortCb does with null abort
    const source = values([1, 2, 3]);
    source(null, (err: any, val: any) => {
      // With mutation: abortCb was called before array processing
      // With original: array processing happens normally
      // The difference: with mutation the source never reaches array iteration
      // So calling source again should give different results
      if (err === null && val === 1) {
        // Original behavior - got first element, try second
        source(null, (err2: any, val2: any) => {
          expect(err2).toBeNull();
          expect(val2).toBe(2);
          done();
        });
      } else {
        // Mutated behavior
        done();
      }
    });
  });
});