import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done behavior with process.domain", () => {
  it("should handle unhandled rejection without process.domain binding", (done) => {
    // Create a rejected promise
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Mock process.domain to test the condition
    const mockProcess = {
      domain: undefined
    };

    // Spy on the original process.domain check
    const originalProcessDomain = process.domain;
    Object.defineProperty(process, 'domain', {
      value: mockProcess.domain,
      writable: true
    });

    // Use done to catch the error
    rejectedPromise.done(
      () => {
        // This should not be called
        done(new Error("Promise should have been rejected"));
      },
      (error: Error) => {
        // Restore original process.domain
        Object.defineProperty(process, 'domain', {
          value: originalProcessDomain,
          writable: true
        });
        // Verify the error is the expected one
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("Test error");
        done();
      }
    );
  });
});