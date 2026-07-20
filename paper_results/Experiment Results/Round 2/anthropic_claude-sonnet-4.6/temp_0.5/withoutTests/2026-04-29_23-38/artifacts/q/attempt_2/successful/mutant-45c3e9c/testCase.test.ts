import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("nextTick.runAfter mutation detection", () => {
  it("should execute runAfter tasks scheduled outside of a flush cycle", async () => {
    const results: string[] = [];
    
    // Wait for any pending Q operations to complete first
    await new Promise<void>((resolve) => setTimeout(resolve, 50));
    
    // Now call runAfter when definitely not flushing
    // Original: if (!flushing) { flushing = true; requestTick(); } -> task runs
    // Mutated: if (false) -> requestTick() never called -> task never runs
    Q.nextTick.runAfter(function () {
      results.push("runAfter task executed");
    });
    
    // Wait for async processing
    await new Promise<void>((resolve) => setTimeout(resolve, 200));
    
    expect(results).toHaveLength(1);
    expect(results[0]).toBe("runAfter task executed");
  });
});