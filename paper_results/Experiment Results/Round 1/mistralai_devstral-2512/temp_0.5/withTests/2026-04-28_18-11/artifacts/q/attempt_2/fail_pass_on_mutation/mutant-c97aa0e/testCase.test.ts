// testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.any", () => {
  it("should fulfill with the first resolved promise from the array", async () => {
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();
    const promises = [deferred1.promise, deferred2.promise];

    // Set up a test where the second promise resolves first
    setTimeout(() => {
      deferred2.resolve("second");
    }, 10);
    setTimeout(() => {
      deferred1.resolve("first");
    }, 20);

    const result = await Q.any(promises);
    expect(result).toBe("second");
  });
});