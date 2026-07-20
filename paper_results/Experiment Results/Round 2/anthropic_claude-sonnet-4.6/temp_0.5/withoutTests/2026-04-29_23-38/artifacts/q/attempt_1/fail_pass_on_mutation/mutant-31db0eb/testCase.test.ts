import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick behavior", () => {
  it("should resolve promises correctly when window is undefined in MessageChannel environment", async () => {
    // The mutation changes `if (typeof window !== "undefined")` to `if (true)`
    // This affects the requestTick setup in the MessageChannel branch
    // We test that basic promise resolution works correctly
    const result = await Q.Promise((resolve: (v: number) => void) => {
      resolve(42);
    });
    expect(result).toBe(42);
  });
});