import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong stack counter behavior", () => {
  it("should properly limit stack trace concatenation using __minimumStackCounter__", async () => {
    Q.longStackSupport = true;

    // Create a chain of promises to build up stack counters
    const error = new Error("test error");

    // We'll create a chain: p1 -> p2 -> p3 -> rejection
    // With the original code, __minimumStackCounter__ is set so that
    // we don't re-include stacks that were already concatenated.
    // With the mutated code, __minimumStackCounter__ is always undefined,
    // so the condition `!error.__minimumStackCounter__` is always true,
    // meaning all stacks get included every time makeStackTraceLong is called.

    // Create a deferred that we'll reject
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    // Build a promise chain where the error propagates through multiple .then() calls
    const promise1 = deferred1.promise;
    const promise2 = promise1.then(function step1(v) { return v; });
    const promise3 = promise2.then(function step2(v) { return v; });

    // Collect the final rejection reason's stack
    let capturedStack: string | undefined;
    const finalPromise = promise3.then(
      null,
      function captureRejection(err: Error) {
        capturedStack = err.stack;
        return "handled";
      }
    );

    // Reject the first deferred with our error
    deferred1.reject(error);

    await finalPromise;

    // The stack should exist
    expect(capturedStack).toBeDefined();
    expect(typeof capturedStack).toBe("string");

    // With the original code, __minimumStackCounter__ is set to p.stackCounter
    // on the first pass, so subsequent passes skip stacks already counted.
    // With the mutated code, __minimumStackCounter__ is never set (value is undefined),
    // so the STACK_JUMP_SEPARATOR appears more times than it should.
    // 
    // Specifically, with the original code the stack trace is built correctly once.
    // With the mutation, because __minimumStackCounter__ is never properly set,
    // the stack could be built with duplicate/extra sections.
    //
    // We verify that the stack does NOT contain an excessive number of 
    // "From previous event:" separators that would indicate duplicate inclusion.
    const separator = "From previous event:";
    const separatorCount = (capturedStack!.split(separator).length - 1);
    
    // With correct behavior, we should have a reasonable number of separators
    // (at most a few for the promise chain depth).
    // With the mutation, the counter is never stored so stacks accumulate incorrectly.
    // The chain has 3 promises, so we expect at most 3 separators.
    // With the bug, we'd get more because __minimumStackCounter__ is never set,
    // causing all stacks to be re-included on each call.
    expect(separatorCount).toBeLessThanOrEqual(3);
  });
});