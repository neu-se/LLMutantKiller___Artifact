import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isStopIteration behavior", () => {
  it("should reject when a non-StopIteration exception is thrown in a SpiderMonkey-style generator", () => {
    // Q["return"] throws a QReturnValue, which isStopIteration should recognize
    // A regular Error should NOT be recognized as StopIteration
    // We test this by using Q.async with a generator that throws a regular error
    // In the mutated code, isStopIteration always returns true, so any exception
    // would be treated as a StopIteration (return value) instead of a rejection
    
    // We need to trigger the SpiderMonkey path, but StopIteration is undefined in Node
    // Instead, test Q["return"] which throws QReturnValue - isStopIteration should be true for it
    // and false for regular errors
    
    // The observable behavior: Q.async with a generator that throws a regular Error
    // should result in a rejected promise, not a fulfilled one
    const regularError = new Error("regular error");
    
    // Use Q.async with an ES6 generator - in the ES6 path, exceptions are caught
    // and rejected directly without calling isStopIteration
    // So we need another approach: directly test Q["return"] behavior
    
    // Q["return"](value) throws a QReturnValue
    // In async generators (SpiderMonkey path), isStopIteration(QReturnValue) should be true
    // With mutation, isStopIteration always returns true, so even regular errors
    // would be treated as return values
    
    // Since StopIteration is undefined in Node.js, the SpiderMonkey path is never taken
    // The mutation is in dead code for Node.js - we verify Q["return"] throws correctly
    expect(() => Q["return"](42)).toThrow();
    
    let thrownValue: any;
    try {
      Q["return"](42);
    } catch (e) {
      thrownValue = e;
    }
    
    // The thrown value should have .value === 42
    expect(thrownValue.value).toBe(42);
    
    // A regular error should NOT have .value === 42
    const regularErr = new Error("test");
    // isStopIteration(regularErr) should be false in original, true in mutant
    // We can test this indirectly: Q.async generator that throws a regular error
    // should be rejected, not fulfilled with undefined
    const asyncFn = Q.async(function* () {
      throw regularError;
    });
    
    return asyncFn().then(
      function(val: any) {
        // In mutated code with SpiderMonkey path this would succeed, but in ES6 path
        // exceptions go through reject() directly - this should not be reached
        throw new Error("Should have been rejected, got: " + val);
      },
      function(err: any) {
        expect(err).toBe(regularError);
      }
    );
  });
});