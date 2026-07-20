import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delay", () => {
  it("should delay resolution when called with a single timeout argument (no object)", async () => {
    const start = Date.now();
    const result = await Q.delay(50);
    const elapsed = Date.now() - start;
    // The result should be undefined (since no object was passed)
    // and it should have taken at least ~50ms
    expect(elapsed).toBeGreaterThanOrEqual(40);
    // More importantly, the promise should resolve (not be undefined/broken)
    expect(result).toBeUndefined();
  });
});