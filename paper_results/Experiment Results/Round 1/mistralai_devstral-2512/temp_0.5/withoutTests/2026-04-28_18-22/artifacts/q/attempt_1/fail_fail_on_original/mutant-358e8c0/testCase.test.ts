import { Q } from "./q.js";

describe("Q.all behavior with pending promises", () => {
  it("should not fulfill when given an array with a pending promise", (done) => {
    const pendingPromise = Q.defer().promise;
    const testPromise = Q.all([pendingPromise]);

    // The test promise should remain pending since the input contains a pending promise
    testPromise.then(
      () => {
        done(new Error("Promise should not have fulfilled"));
      },
      () => {
        done(new Error("Promise should not have rejected"));
      }
    );

    // Use setTimeout to check the state after the event loop tick
    setTimeout(() => {
      const snapshot = testPromise.inspect();
      if (snapshot.state === "fulfilled") {
        done(new Error("Promise should still be pending, not fulfilled"));
      } else {
        done();
      }
    }, 10);
  });
});