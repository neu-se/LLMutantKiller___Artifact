import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.fin test", () => {
  it("should handle valid callback function", (done) => {
    const promise = Q.resolve(42);
    const callback = jest.fn();

    promise.fin(callback).then(() => {
      expect(callback).toHaveBeenCalled();
      done();
    }).catch((error: any) => {
      done(error);
    });
  });
});