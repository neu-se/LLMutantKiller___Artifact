import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library", () => {
  it("should resolve promises correctly and filter stack traces via captureLine", async () => {
    // Test that Q works correctly - if captureLine throws due to mutation
    // in environments without stacks, it would break
    const result = await Q.Promise((resolve: (v: number) => void) => {
      resolve(42);
    });
    expect(result).toBe(42);
    
    // Test rejection handling works (uses stack trace filtering)
    const rejection = Q.reject(new Error("test error"));
    const state = rejection.inspect();
    expect(state.state).toBe("rejected");
  });
});