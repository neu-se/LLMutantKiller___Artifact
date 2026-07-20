// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should only emit unhandledRejection when process.emit exists", () => {
    // Create a promise that will be rejected
    const rejectedPromise = Q.reject(new Error("test error"));

    // In the original code, this should not emit an event since process.emit doesn't exist
    // In the mutated code, this will try to call process.emit which doesn't exist
    let eventEmitted = false;
    const originalEmit = process.emit;
    process.emit = function(eventName: string) {
      if (eventName === "unhandledRejection") {
        eventEmitted = true;
      }
      return true;
    };

    // Force the tracking to happen
    Q.resetUnhandledRejections();
    Q.getUnhandledReasons();

    // Restore original emit
    process.emit = originalEmit;

    // In the original code, eventEmitted should remain false
    // In the mutated code, eventEmitted would be true
    expect(eventEmitted).toBe(false);
  });
});