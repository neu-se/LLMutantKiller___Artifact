import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q null rejection propagation", () => {
  it("should call rejection handler with null, not TypeError", async () => {
    let handlerCallCount = 0;
    let handlerReceivedReason: any = "sentinel";
    let rejectedWithError: any = null;

    await new Promise<void>((resolve) => {
      Q.reject(null)
        .then(
          undefined,
          (reason: any) => {
            handlerCallCount++;
            handlerReceivedReason = reason;
          }
        )
        .then(
          () => resolve(),
          (err: any) => {
            rejectedWithError = err;
            resolve();
          }
        );
    });

    // Original: rejection handler called with null
    // Mutated: makeStackTraceLong throws TypeError, handler never called,
    //          downstream promise rejects with TypeError
    expect(handlerCallCount).toBe(1);
    expect(handlerReceivedReason).toBeNull();
    expect(rejectedWithError).toBeNull();
  });
});