const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.race mutation test", () => {
  it("should detect out-of-bounds access in race implementation", () => {
    const promises = [Q.resolve(1), Q.resolve(2), Q.resolve(3)];
    return Q.race(promises).then((result: number) => {
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(3);
    });
  });
});