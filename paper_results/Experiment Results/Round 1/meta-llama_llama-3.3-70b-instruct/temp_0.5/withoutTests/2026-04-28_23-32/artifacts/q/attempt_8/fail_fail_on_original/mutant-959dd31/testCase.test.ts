import { Q } from "../../../q.js";

describe("Q", () => {
  it("should reject with a custom error message when timed out", () => {
    const promise = Q.resolve("test");
    const timeoutPromise = promise.timeout(1, "Custom error message");
    return timeoutPromise.then(() => {
      throw new Error("Timeout promise should be rejected");
    }).catch((error: any) => {
      if (!error || "string" !== typeof error) {
        throw new Error("Error should be an instance of Error");
      }
    });
  });
});