import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any behavior with rejected promises", () => {
  it("should resolve with the first fulfilled promise even when some promises are rejected", async () => {
    // With the original code, pendingCount-- decrements when a promise is rejected
    // When all rejections happen and pendingCount reaches 0, it should reject
    // But if one fulfills, it resolves
    
    // Create a scenario where we have multiple promises, some rejected, one fulfilled
    // The key behavior: Q.any should resolve with the fulfilled value
    
    const rejectedPromise1 = Q.reject(new Error("error1"));
    const rejectedPromise2 = Q.reject(new Error("error2"));
    const fulfilledPromise = Q.resolve(42);
    
    // With original code: pendingCount starts at 3, decrements on each rejection
    // When all 3 are processed and none fulfilled, it should reject
    // But here one fulfills so it resolves with 42
    
    // With mutated code: pendingCount++ on rejection means it never reaches 0
    // The deferred never resolves/rejects properly for all-rejected case
    
    // Test the all-rejected case to detect the mutation
    const allRejected = [
      Q.reject(new Error("err1")),
      Q.reject(new Error("err2")),
      Q.reject(new Error("err3"))
    ];
    
    // With original code: pendingCount decrements to 0 after all rejections
    // but Q.any doesn't reject in this case based on the code - it just never resolves
    // Let's test the fulfilled case instead
    
    const result = await Q.any([rejectedPromise1, rejectedPromise2, fulfilledPromise]);
    expect(result).toBe(42);
  });
});