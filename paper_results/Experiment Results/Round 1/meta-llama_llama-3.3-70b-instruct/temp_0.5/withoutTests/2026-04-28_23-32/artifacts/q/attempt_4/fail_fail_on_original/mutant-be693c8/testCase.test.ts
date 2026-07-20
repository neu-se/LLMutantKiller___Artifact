import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should reject the promise after the specified timeout", (done) => {
    const promise = Q.timeout(Q.resolve("test"), 100);
    promise.then(() => {
      done.fail("Promise should be rejected");
    }).catch((error) => {
      expect(promise.isRejected()).toBe(true);
      expect(typeof error).toBe('object');
      done();
    });
    setTimeout(() => {
      expect(promise.isPending()).toBe(false);
    }, 150);
  });
});