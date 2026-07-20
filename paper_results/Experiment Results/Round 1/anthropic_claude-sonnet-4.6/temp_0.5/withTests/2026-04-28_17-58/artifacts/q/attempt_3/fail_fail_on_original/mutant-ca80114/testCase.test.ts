/**
 * @jest-environment jsdom
 */
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("error handling in non-Node environment", () => {
  it("should handle errors asynchronously (not re-throw synchronously) in browser environment", done => {
    // In jsdom environment, isNodeJS should be false
    // Original: if (isNodeJS) -> false -> uses setTimeout for async rethrow
    // Mutated: if (true) -> true -> throws synchronously, breaking flush
    
    const results: number[] = [];
    
    // Queue multiple tasks
    Q.nextTick(function() {
      throw new Error("task 1 throws");
    });
    
    Q.nextTick(function() {
      results.push(1);
    });
    
    Q.nextTick(function() {
      results.push(2);
    });
    
    setTimeout(function() {
      // In original code (browser path): error is async, flush continues, both tasks run
      // In mutated code (if true): error throws synchronously, flush aborts, tasks may not run
      expect(results).toEqual([1, 2]);
      done();
    }, 200);
  });
});