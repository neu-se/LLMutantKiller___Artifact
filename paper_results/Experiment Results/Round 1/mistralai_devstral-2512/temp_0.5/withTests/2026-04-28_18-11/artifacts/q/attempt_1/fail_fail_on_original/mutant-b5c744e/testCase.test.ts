// Test case to detect the mutation in Q.any()
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any() behavior", () => {
  it("should reject when all promises are rejected", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const promises = [deferred1.promise, deferred2.promise];

    // Reject both promises
    deferred1.reject(new Error("First error"));
    deferred2.reject(new Error("Second error"));

    // The promise should be rejected with an aggregated error message
    await expect(Q.any(promises)).rejects.toThrow(
      "Q can't get fulfillment value from any promise, all promises were rejected. Last error message: Second error"
    );
  });
});