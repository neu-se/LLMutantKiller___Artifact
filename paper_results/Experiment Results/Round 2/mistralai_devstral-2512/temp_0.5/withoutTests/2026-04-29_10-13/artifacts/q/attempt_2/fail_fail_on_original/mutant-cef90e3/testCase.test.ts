import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.then behavior", () => {
  it("should not call the fulfilled callback multiple times when promise is resolved", (done) => {
    let callCount = 0;
    const promise = Q.resolve(42);

    promise.then((value: any) => {
      callCount++;
      expect(value).toBe(42);
    });

    // Give some time for the promise to settle
    setTimeout(() => {
      expect(callCount).toBe(1);
      done();
    }, 10);
  });
});