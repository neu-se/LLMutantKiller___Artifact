import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should reject the promise after the specified timeout", (done) => {
    const promise = Q.timeout(Q.resolve("test"), 100);
    jest.useFakeTimers();
    promise.then(() => {
      done.fail("Promise should be rejected");
    }).catch((error) => {
      expect(error).toBeInstanceOf(Error);
      expect(setTimeout).toHaveBeenCalledTimes(1);
      done();
    });
    jest.advanceTimersByTime(100);
  });
});