const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.race mutation test", () => {
  it("should handle array with multiple promises correctly", () => {
    const promise1 = Q.delay(100, 1);
    const promise2 = Q.delay(50, 2);
    const promise3 = Q.delay(25, 3);
    return Q.race([promise1, promise2, promise3]).then((result) => {
      expect(result).toBe(3);
    });
  });
});