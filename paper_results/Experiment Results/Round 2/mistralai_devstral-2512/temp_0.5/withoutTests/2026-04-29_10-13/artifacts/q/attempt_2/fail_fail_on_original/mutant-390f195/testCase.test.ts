import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack traces", () => {
  it("should properly configure __minimumStackCounter__ as configurable", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a chain of promises to build up stack traces
    const error = new Error("Test error");
    const promise1 = Q.reject(error);
    const promise2 = promise1.then(() => {
      throw new Error("Should not reach here");
    });

    // Force stack trace concatenation
    return promise2.then(
      () => {
        throw new Error("Should have been rejected");
      },
      (err: Error & { __minimumStackCounter__?: number }) => {
        // Check that the error has the expected property
        expect(err).toHaveProperty("__minimumStackCounter__");

        // Verify the property is configurable
        const descriptor = Object.getOwnPropertyDescriptor(err, "__minimumStackCounter__");
        expect(descriptor).toBeDefined();
        expect(descriptor?.configurable).toBe(true);

        // Verify we can delete the property (which should work if configurable is true)
        delete err.__minimumStackCounter__;
        expect(err).not.toHaveProperty("__minimumStackCounter__");
      }
    );
  });
});