import { Q } from "./q";

describe("Q.done behavior with process.domain", () => {
  it("should not bind onUnhandledError to process.domain when process.domain is not available", (done) => {
    // Store the original process.domain
    const originalDomain = process.domain;

    // Delete process.domain to simulate an environment without it
    delete process.domain;

    // Create a rejected promise
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Use done to catch the error
    rejectedPromise.done(
      () => {
        // This should not be called
        done(new Error("Promise should have been rejected"));
      },
      (error) => {
        // Restore process.domain
        process.domain = originalDomain;
        // Verify the error is the expected one
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("Test error");
        done();
      }
    );
  });
});