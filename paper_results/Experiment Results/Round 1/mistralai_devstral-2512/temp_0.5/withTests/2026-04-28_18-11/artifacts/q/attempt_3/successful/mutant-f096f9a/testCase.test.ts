// Test case to detect the mutation in Q.any()
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any() mutation test", () => {
  it("should fulfill with first resolved promise when given multiple promises", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const promises = [deferred1.promise, deferred2.promise];

    // Set up a race condition where deferred2 resolves first
    setTimeout(() => deferred2.resolve("second"), 10);
    setTimeout(() => deferred1.resolve("first"), 20);

    const result = await Q.any(promises);
    expect(result).toBe("second");
  });
});