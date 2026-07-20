// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("defer mutation test", () => {
  it("should properly handle deferred resolution state", async () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    let firstValue: number | null = null;
    let secondValue: number | null = null;

    // First callback
    promise.then(value => {
      firstValue = value;
    });

    // First resolution
    deferred.resolve(10);

    // Second resolution with different value
    deferred.resolve(20);

    // Second callback added after resolutions
    promise.then(value => {
      secondValue = value;
    });

    // Wait for all callbacks
    await Q.delay(10);

    // Both callbacks should receive the first value in original code
    expect(firstValue).toBe(10);
    expect(secondValue).toBe(10);

    // Verify no callback received the second value
    expect(firstValue).not.toBe(20);
    expect(secondValue).not.toBe(20);
  });
});