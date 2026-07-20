import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.race mutation test", () => {
  it("should correctly handle array bounds in race condition", () => {
    const promise1 = Q.delay(100, "result1");
    const promise2 = Q.delay(200, "result2");
    const promises = [promise1, promise2];

    return Q.race(promises).then((result) => {
      expect(result).toBe("result1");
    });
  });
});