import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delay", () => {
  it("should delay resolution when called with a single timeout argument (no object)", async () => {
    const start = Date.now();
    const result = await Q.delay(50);
    const elapsed = Date.now() - start;
    // The result should be undefined when called with just a timeout
    expect(result).toBeUndefined();
    // Should have waited approximately 50ms
    expect(elapsed).toBeGreaterThanOrEqual(40);
  });
});