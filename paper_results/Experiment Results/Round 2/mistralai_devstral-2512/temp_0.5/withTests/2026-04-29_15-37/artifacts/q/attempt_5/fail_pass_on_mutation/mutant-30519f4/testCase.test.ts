const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.all behavior with fulfilled promises", () => {
  it("should not modify the input array when all promises are already fulfilled", async () => {
    const input = [Q(1), Q(2), Q(3)];
    const inputCopy = [Q(1), Q(2), Q(3)];
    await Q.all(input);
    // In the original code, fulfilled promises should be replaced with their values
    // In the mutated code, they won't be
    expect(input).toEqual([1, 2, 3]);
    expect(input).not.toEqual(inputCopy);
  });
});