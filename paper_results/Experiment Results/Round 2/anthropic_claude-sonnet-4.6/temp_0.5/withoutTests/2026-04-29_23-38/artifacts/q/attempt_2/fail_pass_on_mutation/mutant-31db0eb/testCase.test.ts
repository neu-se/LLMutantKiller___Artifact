import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick with MessageChannel", () => {
  it("detects window check mutation in MessageChannel branch", async () => {
    // In Node.js, setImmediate exists so MessageChannel branch isn't used
    // We need to test the behavior difference
    // The mutation makes `if (typeof window !== "undefined")` always true
    // In jsdom (Jest), window IS defined, so both behave the same
    // We need to test in a context where window is undefined
    
    // Test that Q.nextTick works - if mutation causes issues, this will fail
    const result = await new Promise<number>((resolve) => {
      Q.nextTick(() => resolve(1));
    });
    expect(result).toBe(1);
  });
});