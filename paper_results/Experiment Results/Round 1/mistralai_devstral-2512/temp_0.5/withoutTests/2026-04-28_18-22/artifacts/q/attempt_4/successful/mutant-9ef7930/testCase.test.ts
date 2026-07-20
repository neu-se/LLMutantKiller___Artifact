const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.race mutation test", () => {
  it("should correctly handle array bounds in race condition", () => {
    const promise1 = Q.delay(100).then(() => "result1");
    const promise2 = Q.delay(200).then(() => "result2");
    const promises = [promise1, promise2];

    return Q.race(promises).then((result: any) => {
      expect(result).toBe("result1");
    });
  });
});