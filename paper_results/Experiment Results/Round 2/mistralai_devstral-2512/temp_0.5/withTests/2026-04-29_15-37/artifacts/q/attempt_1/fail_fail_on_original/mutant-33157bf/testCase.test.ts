import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should not track rejections when process is an object without emit function", () => {
    // Create a mock process object without emit function
    const originalProcess = global.process;
    global.process = { toString: () => "[object process]" };

    // Reset unhandled rejections tracking
    Q.resetUnhandledRejections();

    // Create and reject a promise
    const rejectedPromise = Q.reject(new Error("test error"));

    // Restore original process
    global.process = originalProcess;

    // Verify no unhandled rejection was tracked
    expect(Q.getUnhandledReasons().length).toBe(0);
  });
});