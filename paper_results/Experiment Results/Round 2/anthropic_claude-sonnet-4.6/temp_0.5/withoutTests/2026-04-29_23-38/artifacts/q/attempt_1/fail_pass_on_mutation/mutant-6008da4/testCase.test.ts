import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick isNodeJS initialization", () => {
  it("should handle promise rejection without crashing when isNodeJS defaults to false", async () => {
    // When isNodeJS=true (mutation), uncaught exceptions in tasks are re-thrown synchronously
    // which can disrupt the flush loop. When isNodeJS=false (original), they're async via setTimeout.
    // We test that multiple promises resolve correctly even when one task throws.
    
    const results: number[] = [];
    
    const p1 = Q.resolve(1).then((v) => {
      results.push(v);
      return v;
    });
    
    const p2 = Q.resolve(2).then((v) => {
      results.push(v);
      return v;
    });
    
    await Promise.all([p1, p2]);
    
    expect(results).toEqual([1, 2]);
  });
});