import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done behavior", () => {
  it("should handle fulfilled promise without callbacks", (done) => {
    const promise = Q.resolve(42);
    promise.done();
    promise.then(() => {
      done();
    }).catch((err: any) => {
      done(err);
    });
  });
});