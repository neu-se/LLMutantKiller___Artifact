import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.race", () => {
  it("should resolve with the first settled promise", (done) => {
    const promise1 = Q.delay(100, "slow");
    const promise2 = Q.resolve("fast");

    Q.race([promise1, promise2]).then((result: any) => {
      expect(result).toBe("fast");
      done();
    });
  });
});