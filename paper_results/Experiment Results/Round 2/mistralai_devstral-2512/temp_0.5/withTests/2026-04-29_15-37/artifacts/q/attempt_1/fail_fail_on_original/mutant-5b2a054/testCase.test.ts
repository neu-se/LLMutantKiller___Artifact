// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Error handling in nextTick", () => {
  it("should re-throw errors in browsers when uncaught in promises", (done) => {
    // This test verifies that errors thrown in promise handlers
    // are re-thrown asynchronously in browser environments
    const error = new Error("Test error");

    // Set up error handler
    const originalOnerror = Q.onerror;
    Q.onerror = (err) => {
      expect(err).toBe(error);
      Q.onerror = originalOnerror;
      done();
    };

    // Create a promise that throws an error
    Q.reject(error).done();

    // Give time for the error to propagate
    setTimeout(() => {
      Q.onerror = originalOnerror;
      done(new Error("Error was not re-thrown"));
    }, 100);
  });
});