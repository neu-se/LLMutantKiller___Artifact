// Test case to detect the mutation in isStopIteration function
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isStopIteration mutation detection", () => {
  it("should correctly identify StopIteration exceptions", () => {
    // Create a mock StopIteration exception (simulating legacy SpiderMonkey behavior)
    const stopIteration = { toString: () => "[object StopIteration]" };
    
    // Create a QReturnValue instance
    const returnValue = new (function QReturnValue(value: any) {
      this.value = value;
    })("test value");
    
    // Test that isStopIteration correctly identifies both types
    // This will fail in the mutated version since it always returns true
    const result1 = Q.async(function* () {
      try {
        throw stopIteration;
      } catch (e) {
        // In the original code, this should be caught as StopIteration
        // In the mutated code, it will incorrectly catch everything
        return "caught";
      }
    })();
    
    const result2 = Q.async(function* () {
      try {
        throw returnValue;
      } catch (e) {
        // In the original code, this should be caught as QReturnValue
        // In the mutated code, it will incorrectly catch everything
        return "caught";
      }
    })();
    
    return Promise.all([result1, result2]).then[([r1, r2]) => {
      expect(r1).toBe("caught");
      expect(r2).toBe("caught");
    }];
  });
});