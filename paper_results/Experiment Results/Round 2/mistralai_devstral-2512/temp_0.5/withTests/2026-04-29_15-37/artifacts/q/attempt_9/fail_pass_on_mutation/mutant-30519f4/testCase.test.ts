const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.all behavior with fulfilled promises", () => {
  it("should replace fulfilled promises with their values during processing", async () => {
    const promises = [Q(1), Q(2), Q(3)];

    // Verify all are promises before calling all()
    expect(Q.isPromise(promises[0])).toBe(true);
    expect(Q.isPromise(promises[1])).toBe(true);
    expect(Q.isPromise(promises[2])).toBe(true);

    // Store the original promise objects
    const originalPromise0 = promises[0];
    const originalPromise1 = promises[1];
    const originalPromise2 = promises[2];

    await Q.all(promises);

    // In original code: fulfilled promises get replaced with values
    // In mutated code: the condition is inverted so they remain as promises
    expect(promises[0]).toBe(1);
    expect(promises[1]).toBe(2);
    expect(promises[2]).toBe(3);

    // Verify the original promises are still valid
    expect(Q.isPromise(originalPromise0)).toBe(true);
    expect(Q.isPromise(originalPromise1)).toBe(true);
    expect(Q.isPromise(originalPromise2)).toBe(true);
  });
});