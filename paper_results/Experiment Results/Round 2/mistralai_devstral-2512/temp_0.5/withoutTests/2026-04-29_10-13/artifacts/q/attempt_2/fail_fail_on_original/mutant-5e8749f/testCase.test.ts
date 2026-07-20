import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise rejection tracking", () => {
  it("should properly untrack handled rejections", (done) => {
    // Create a rejected promise
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Add a handler to the rejection after a delay to ensure it's tracked
    setTimeout(() => {
      rejectedPromise.catch(() => {
        // After handling, the rejection should be untracked
        const unhandled = Q.getUnhandledReasons();
        expect(unhandled.length).toBe(0);
        done();
      });
    }, 10);
  });
});