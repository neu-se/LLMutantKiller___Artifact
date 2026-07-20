import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nfapply", () => {
  it("should resolve with the result of applying the callback with the provided arguments", (done) => {
    const testCallback = (a: number, b: number, callback: (err: Error | null, result?: number) => void) => {
      callback(null, a + b);
    };

    Q.nfapply(testCallback, [2, 3])
      .then((result: number) => {
        expect(result).toBe(5);
        done();
      })
      .catch((err: Error) => {
        done(err);
      });
  });
});