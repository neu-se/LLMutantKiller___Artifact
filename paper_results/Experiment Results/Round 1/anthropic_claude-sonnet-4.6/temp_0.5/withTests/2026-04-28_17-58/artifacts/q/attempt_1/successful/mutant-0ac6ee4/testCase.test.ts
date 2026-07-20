import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("timeout error message", () => {
  it("should include 'ms' unit in the timeout error message when no custom error is provided", () => {
    const ms = 50;
    return Q.delay(200)
      .timeout(ms)
      .then(
        () => {
          throw new Error("Expected promise to be rejected due to timeout");
        },
        (error: Error) => {
          expect(error.message).toBe("Timed out after " + ms + " ms");
        }
      );
  });
});