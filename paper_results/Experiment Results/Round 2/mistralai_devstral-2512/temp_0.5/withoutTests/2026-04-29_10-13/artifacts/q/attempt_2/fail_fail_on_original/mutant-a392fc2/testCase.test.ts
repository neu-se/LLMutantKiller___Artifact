import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.fin test", () => {
  it("should handle valid callback function correctly", (done) => {
    const promise = Q.resolve(42);
    const callback = () => Q.resolve();

    promise.fin(callback)
      .then((value: number) => {
        expect(value).toBe(42);
        done();
      })
      .catch((error: Error) => {
        done(error);
      });
  });
});