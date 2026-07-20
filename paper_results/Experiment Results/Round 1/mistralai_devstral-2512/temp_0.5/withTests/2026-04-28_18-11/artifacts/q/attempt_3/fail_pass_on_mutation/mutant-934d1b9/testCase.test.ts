// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("defer mutation test", () => {
  it("should prevent multiple resolutions of the same deferred", async () => {
    const deferred = Q.defer();
    let resolveCount = 0;

    deferred.promise.then(() => {
      resolveCount++;
    });

    // First resolution
    deferred.resolve(10);

    // Second resolution attempt (should be ignored in original code)
    deferred.resolve(20);

    // Wait for promise to settle
    await Q.delay(10);

    // Should only be called once in original code
    expect(resolveCount).toBe(1);
  });
});