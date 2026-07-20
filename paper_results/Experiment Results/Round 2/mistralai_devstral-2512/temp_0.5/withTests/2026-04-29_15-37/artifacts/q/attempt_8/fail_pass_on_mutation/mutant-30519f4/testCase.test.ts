const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.all behavior with fulfilled promises", () => {
  it("should modify the input array by replacing fulfilled promises with their values", async () => {
    const promises = [Q(1), Q(2), Q(3)];

    // Create a copy to verify modification
    const originalPromises = promises.map(p => p);
    expect(originalPromises.every(p => Q.isPromise(p))).toBe(true);

    await Q.all(promises);

    // In original code: fulfilled promises are replaced with values
    // In mutated code: the condition is inverted so they remain as promises
    expect(promises).toEqual([1, 2, 3]);
    expect(promises.every(item => !Q.isPromise(item))).toBe(true);
  });
});