import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should reject the promise after the specified timeout", (done) => {
    const promise = Q.timeout(Q.resolve("test"), 100);
    let timeoutId: any;
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout').mockImplementation((fn, ms) => {
      timeoutId = jest.runOnlyPendingTimers();
      return timeoutId;
    });
    promise.then(() => {
      done.fail("Promise should be rejected");
    }).catch(() => {
      expect(setTimeout).toHaveBeenCalledTimes(1);
      done();
    });
    jest.runAllTimers();
  });
});