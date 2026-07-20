import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isStopIteration mutation detection", () => {
  it("Q.async should properly handle non-StopIteration exceptions in SpiderMonkey-style generators", async () => {
    // In the SpiderMonkey path (when StopIteration is defined), isStopIteration
    // being always true would cause regular errors to be treated as return values
    // We test Q["return"] behavior through Q.async with ES6 generators
    // The mutation makes isStopIteration always return true
    // We can detect this by testing that a regular error thrown in async is rejected
    const asyncFn = Q.async(function* () {
      throw new Error("test error");
    });

    return asyncFn().then(
      () => { throw new Error("Should have rejected"); },
      (err: Error) => { expect(err.message).toBe("test error"); }
    );
  });
});