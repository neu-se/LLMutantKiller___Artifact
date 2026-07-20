const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done behavior with process.domain", () => {
  it("should handle unhandled rejection based on process.domain availability", (done) => {
    // Store original process.domain
    const originalDomain = (process as any).domain;

    // Test case 1: With process.domain available
    (process as any).domain = { bind: (fn: Function) => fn };
    let test1Passed = false;

    const promise1 = Q.reject(new Error("Test error 1"));
    promise1.done(
      () => {},
      (error: Error) => {
        test1Passed = true;
        expect(error.message).toBe("Test error 1");
      }
    );

    // Test case 2: Without process.domain
    delete (process as any).domain;
    let test2Passed = false;

    const promise2 = Q.reject(new Error("Test error 2"));
    promise2.done(
      () => {},
      (error: Error) => {
        test2Passed = true;
        expect(error.message).toBe("Test error 2");
      }
    );

    // Restore original process.domain
    (process as any).domain = originalDomain;

    // Verify both test cases passed
    setTimeout(() => {
      expect(test1Passed).toBe(true);
      expect(test2Passed).toBe(true);
      done();
    }, 10);
  });
});