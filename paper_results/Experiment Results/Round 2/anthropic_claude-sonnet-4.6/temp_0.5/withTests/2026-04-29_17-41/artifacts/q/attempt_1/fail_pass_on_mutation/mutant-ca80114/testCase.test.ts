import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("promise error handling in async queue", () => {
  it("should continue processing subsequent promises after one handler throws an error", async () => {
    // This test verifies that when a promise handler throws, subsequent
    // promises in the queue are still processed correctly.
    // In the mutated code (if (true) instead of if (isNodeJS)),
    // the behavior diverges when isNodeJS is false, but we verify
    // the observable outcome: subsequent tasks still execute.
    
    const results: number[] = [];
    
    const p1 = Q.resolve(1).then((v: number) => {
      results.push(v);
      throw new Error("intentional error");
    });
    
    const p2 = Q.resolve(2).then((v: number) => {
      results.push(v);
      return v;
    });
    
    // p1 rejects due to thrown error, p2 should still resolve
    await p1.catch(() => {});
    await p2;
    
    expect(results).toContain(1);
    expect(results).toContain(2);
    expect(results.length).toBe(2);
  });
});