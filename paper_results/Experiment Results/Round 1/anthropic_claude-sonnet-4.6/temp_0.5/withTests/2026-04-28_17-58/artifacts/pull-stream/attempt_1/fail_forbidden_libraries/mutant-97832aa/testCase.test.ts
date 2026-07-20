import { describe, it, expect } from "@jest/globals";
import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull with null argument", () => {
  it("should not throw when a null value is passed as a stream argument and should return the source read function", (done) => {
    // In the original code, `s && typeof s === 'object'` is false for null,
    // so null is skipped. In the mutated code, `s || typeof s === 'object'`
    // evaluates to `null || true` = true for null, causing s.sink(read) to throw.
    
    const values: number[] = [];
    
    expect(() => {
      // Pass null as one of the pipeline arguments - original handles this gracefully
      // by skipping it (neither a function nor a truthy object), but mutant will
      // try to call null.sink(read) and throw TypeError
      const source = function(abort: any, cb: any) {
        if (abort) return cb(abort);
        cb(null, 42);
      };
      
      // null is not a function and original: null && typeof null === 'object' => false (skip)
      // mutant: null || typeof null === 'object' => true (tries null.sink => throws)
      const result = pull(source, null as any);
      
      // In original, result should be the source function (null was skipped)
      result(true, (err: any) => {
        done();
      });
    }).not.toThrow();
  });
});