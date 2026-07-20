// Jest test file containing exactly one test case
import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe("take - terminate passes error from upstream", () => {
  it("should pass the actual error from upstream when terminating, not just true", (done) => {
    const upstreamError = new Error("upstream abort error");
    
    // Create a source that returns an error when aborted
    let callCount = 0;
    function source(end: any, cb: (end: any, data?: any) => void) {
      if (end) {
        // When asked to abort, return an actual error
        cb(upstreamError);
        return;
      }
      callCount++;
      if (callCount === 1) {
        cb(null, 10); // first item passes test
      } else {
        cb(null, 20); // second item fails test (test returns false for >= 15)
      }
    }
    
    // test function: returns true for items < 15, false otherwise
    // last = false (default), so when test fails, terminate is called
    const through = take((data: number) => data < 15);
    const sink = through(source);
    
    // Read first item - should pass
    sink(null, (end: any, data: any) => {
      expect(end).toBeFalsy();
      expect(data).toBe(10);
      
      // Read second item - test will fail (20 >= 15), so terminate is called
      // The upstream returns upstreamError when aborted
      // Original: cb(err || true) => cb(upstreamError)
      // Mutated: cb(true) => cb(true)
      sink(null, (end: any, data: any) => {
        // In original code, end should be the upstreamError
        // In mutated code, end would be just `true`
        expect(end).toBe(upstreamError);
        done();
      });
    });
  });
});