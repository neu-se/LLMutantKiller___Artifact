const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.all behavior with fulfilled promises", () => {
  it("should replace fulfilled promises with their values in the input array", async () => {
    const fulfilled1 = Q(1);
    const fulfilled2 = Q(2);
    const promises = [fulfilled1, fulfilled2, Q(3)];

    // Store references to check if they get replaced
    const originalPromises = [...promises];

    await Q.all(promises);

    // In original code: fulfilled promises should be replaced with values
    // In mutated code: they won't be replaced (condition is inverted)
    expect(promises[0]).toBe(1);
    expect(promises[1]).toBe(2);
    expect(promises[2]).toBe(3);

    // Verify the original promises are still valid promises
    expect(Q.isPromise(originalPromises[0])).toBe(true);
    expect(Q.isPromise(originalPromises[1])).toBe(true);
  });
});