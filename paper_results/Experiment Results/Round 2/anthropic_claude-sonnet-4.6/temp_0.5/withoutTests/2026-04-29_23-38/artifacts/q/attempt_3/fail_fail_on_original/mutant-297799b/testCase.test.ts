import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame mutation detection", () => {
  it("long stack trace filtering should produce empty string when no node module frames exist", async () => {
    Q.longStackSupport = true;

    // Create a deferred and reject it to trigger makeStackTraceLong
    const deferred = Q.defer<void>();
    
    // Create a chain so promise.source is set (needed for makeStackTraceLong)
    const p1 = deferred.promise;
    const p2 = p1.then(() => {});

    deferred.reject(new Error("sentinel"));

    let caughtError: Error | undefined;
    await p2.then(null, (err: Error) => {
      caughtError = err;
    });

    // In original: isNodeFrame returns false for all test env lines
    // filterStackString returns "" -> stack becomes ""
    // In mutated: isNodeFrame returns true for all lines
    // filterStackString returns all non-internal lines -> stack is non-empty
    expect(caughtError!.stack).toBe("");
  });
});