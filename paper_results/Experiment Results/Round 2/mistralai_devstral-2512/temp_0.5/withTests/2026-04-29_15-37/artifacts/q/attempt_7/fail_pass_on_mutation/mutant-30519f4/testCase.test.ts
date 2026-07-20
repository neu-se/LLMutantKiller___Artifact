const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.all behavior with fulfilled promises", () => {
  it("should correctly identify and replace fulfilled promises in the array", async () => {
    const fulfilledPromise = Q(42);
    const promises = [fulfilledPromise, Q(2), Q(3)];

    // Verify the promise is fulfilled before calling all()
    expect(fulfilledPromise.isFulfilled()).toBe(true);

    const result = await Q.all(promises);

    // In original code: fulfilled promises get replaced with their values
    // In mutated code: the condition is inverted so they won't be replaced
    expect(result).toEqual([42, 2, 3]);
    expect(promises[0]).toBe(42); // Should be replaced with value
    expect(promises[1]).toBe(2);  // Should be replaced with value
    expect(promises[2]).toBe(3);  // Should be replaced with value
  });
});