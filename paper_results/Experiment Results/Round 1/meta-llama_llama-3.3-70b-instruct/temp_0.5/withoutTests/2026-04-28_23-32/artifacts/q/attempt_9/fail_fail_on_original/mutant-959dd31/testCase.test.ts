import { Q } from "../../../q.js";

describe("Q", () => {
  it("should reject with a custom error message when timed out", () => {
    const promise = Q.resolve("test");
    const timeoutPromise = promise.timeout(1, "Custom error message");
    return timeoutPromise.catch((error: any) => {
      if (error && typeof error === "object" && error.code === "ETIMEDOUT") {
        return;
      }
      throw new Error("Timeout promise should be rejected with ETIMEDOUT error");
    });
  });
});