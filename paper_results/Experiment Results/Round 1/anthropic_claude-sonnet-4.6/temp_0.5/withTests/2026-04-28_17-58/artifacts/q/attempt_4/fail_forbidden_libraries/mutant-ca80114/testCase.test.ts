import { describe, it, expect } from "@jest/globals";

describe("Q flush behavior with isNodeJS=false", () => {
  it("should continue flushing remaining tasks after one throws, in non-node mode", done => {
    // Temporarily make process appear non-Node so Q sets isNodeJS=false
    const origToString = process.toString;
    (process as any).toString = () => "[object Object]";
    
    jest.resetModules();
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    
    // Restore immediately after module load
    (process as any).toString = origToString;
    
    const results: number[] = [];
    
    // With isNodeJS=false:
    // Original: catch uses setTimeout(()=>throw e, 0) - async, flush loop continues
    // Mutated (if true): catch uses throw e synchronously - flush loop aborts
    
    Q.nextTick(function() {
      throw new Error("intentional");
    });
    
    Q.nextTick(function() {
      results.push(1);
    });
    
    Q.nextTick(function() {
      results.push(2);
    });
    
    setTimeout(function() {
      // Original: results = [1, 2] (flush continued after async error)
      // Mutated: results = [] or partial (flush aborted by sync throw)
      expect(results).toEqual([1, 2]);
      done();
    }, 500);
  });
});