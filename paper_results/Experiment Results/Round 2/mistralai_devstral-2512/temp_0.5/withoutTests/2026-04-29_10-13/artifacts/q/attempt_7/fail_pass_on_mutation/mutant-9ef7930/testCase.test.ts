const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.race mutation test", () => {
  it("should handle array with multiple promises correctly", () => {
    const promise1 = Q.resolve(1);
    const promise2 = Q.resolve(2);
    const promise3 = Q.resolve(3);
    return Q.race([promise1, promise2, promise3]).then((result: number) => {
      expect([1, 2, 3]).toContain(result);
    });
  });
});