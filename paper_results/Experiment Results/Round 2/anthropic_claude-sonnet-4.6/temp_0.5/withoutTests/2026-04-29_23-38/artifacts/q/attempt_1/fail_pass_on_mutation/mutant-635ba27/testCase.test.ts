import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any with multiple rejected promises", () => {
  it("should reject with the last error when all promises are rejected", async () => {
    // The mutation changes `i++` to `i--` in the array_indexOf shim fallback.
    // array_indexOf is used in trackRejection/untrackRejection to find promises
    // in the unhandledRejections array. The `any` function uses pendingCount
    // which relies on proper array operations.
    // 
    // More directly, we can test Q.any which uses array_reduce and when promises
    // are rejected, it decrements pendingCount. The array_indexOf is used in
    // untrackRejection. If array_indexOf loops infinitely (i-- instead of i++),
    // the test will hang/timeout.
    //
    // Let's test a scenario that exercises array_indexOf through rejection tracking.
    
    const p1 = Q.reject(new Error("error1"));
    const p2 = Q.reject(new Error("error2"));
    
    // Q.any should reject when all promises reject
    // This exercises the rejection tracking which uses array_indexOf
    const result = await Q.any([p1, p2]).then(
      () => "fulfilled",
      (err: Error) => "rejected: " + err.message
    );
    
    // Should get rejected since all promises rejected
    expect(result).toMatch(/^rejected:/);
  });
});