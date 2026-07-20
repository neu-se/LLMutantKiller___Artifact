import { Q } from "./q.js";

describe("Q.done behavior", () => {
  it("should handle fulfilled promise without callbacks", (done) => {
    const promise = Q.resolve(42);
    promise.done();
    // If the mutation is present, this will throw an error because
    // the promise will be set to `true` instead of the actual promise,
    // causing the .then() call to fail
    promise.then(() => {
      done();
    }).catch((err) => {
      done(err);
    });
  });
});