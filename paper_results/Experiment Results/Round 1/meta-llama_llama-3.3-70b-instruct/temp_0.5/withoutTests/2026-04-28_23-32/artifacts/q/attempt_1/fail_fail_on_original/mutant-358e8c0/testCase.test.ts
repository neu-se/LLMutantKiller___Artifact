import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
  it("should not resolve if one of the promises is pending", (done) => {
    const pendingPromise = new Promise(() => {});
    const fulfilledPromise = Q.resolve(1);
    const allPromise = Q.all([pendingPromise, fulfilledPromise]);
    allPromise.then(() => {
      done.fail("Should not resolve");
    }).catch((error) => {
      done.fail("Should not reject");
    });
    setTimeout(() => {
      expect(allPromise.inspect().state).toBe("pending");
      done();
    }, 10);
  });
});