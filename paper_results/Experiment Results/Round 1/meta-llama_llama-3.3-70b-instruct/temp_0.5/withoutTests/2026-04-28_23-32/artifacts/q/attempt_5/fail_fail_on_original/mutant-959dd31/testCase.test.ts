import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should reject with a custom error message when timed out", () => {
    const promise = Q.resolve("test");
    const timeoutPromise = promise.timeout(1, "Custom error message");
    return timeoutPromise.catch((error: any) => {
      expect(error.code).toBe("ETIMEDOUT");
    });
  });
});