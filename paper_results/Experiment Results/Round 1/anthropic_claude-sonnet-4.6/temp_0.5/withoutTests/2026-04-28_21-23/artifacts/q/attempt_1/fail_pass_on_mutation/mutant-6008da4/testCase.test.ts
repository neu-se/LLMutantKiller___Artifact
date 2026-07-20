import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise behavior with isNodeJS flag", () => {
  it("should resolve second promise even when first task throws an error", async () => {
    // With isNodeJS = false (original): exceptions in tasks are caught and re-thrown async
    // With isNodeJS = true (mutated): exceptions interrupt the flush loop synchronously
    
    const results: number[] = [];
    
    // Create a promise that rejects (causes an error in the flush loop)
    const p1 = Q.reject(new Error("test error")).fail(() => {
      results.push(1);
      return 1;
    });
    
    // Create a second promise that should resolve
    const p2 = Q.resolve(2).then((val) => {
      results.push(val);
      return val;
    });
    
    const [r1, r2] = await Promise.all([p1, p2]);
    
    expect(r1).toBe(1);
    expect(r2).toBe(2);
    expect(results).toContain(1);
    expect(results).toContain(2);
  });
});