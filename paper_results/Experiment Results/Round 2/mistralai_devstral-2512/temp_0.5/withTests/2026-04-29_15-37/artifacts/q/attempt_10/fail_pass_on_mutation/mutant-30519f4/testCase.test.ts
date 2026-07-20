const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.all behavior with fulfilled promises", () => {
  it("should correctly handle array modification for fulfilled promises", async () => {
    const fulfilled1 = Q(1);
    const fulfilled2 = Q(2);
    const fulfilled3 = Q(3);

    // Verify all promises are fulfilled before calling all()
    expect(fulfilled1.isFulfilled()).toBe(true);
    expect(fulfilled2.isFulfilled()).toBe(true);
    expect(fulfilled3.isFulfilled()).toBe(true);

    const promises = [fulfilled1, fulfilled2, fulfilled3];

    // Store references to check modification
    const ref1 = promises[0];
    const ref2 = promises[1];
    const ref3 = promises[2];

    await Q.all(promises);

    // In original code: fulfilled promises should be replaced with values
    // In mutated code: condition is inverted so they won't be replaced
    expect(promises[0]).toBe(1);
    expect(promises[1]).toBe(2);
    expect(promises[2]).toBe(3);

    // Verify the references changed (original promises replaced with values)
    expect(promises[0]).not.toBe(ref1);
    expect(promises[1]).not.toBe(ref2);
    expect(promises[2]).not.toBe(ref3);
  });
});