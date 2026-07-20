import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Long stack traces mutation test", () => {
  it("should properly set __minimumStackCounter__ as configurable", () => {
    // Enable long stack support
    Q.longStackSupport = true;

    // Create a chain of promises to generate stack traces
    const error = new Error("Test error");
    let promiseChain = Q.reject(error);

    // Add multiple levels to the promise chain
    for (let i = 0; i < 5; i++) {
      promiseChain = promiseChain.then(null, (e: Error) => {
        throw e;
      });
    }

    return promiseChain.catch((caughtError: Error) => {
      // Verify the error has the expected properties
      expect(caughtError).toBe(error);

      // Check if __minimumStackCounter__ property exists and is configurable
      const descriptor = Object.getOwnPropertyDescriptor(caughtError, "__minimumStackCounter__");
      expect(descriptor).toBeDefined();
      if (descriptor) {
        expect(descriptor.configurable).toBe(true);
        expect(descriptor.value).toBeDefined();
        expect(typeof descriptor.value).toBe("number");
      }

      // Clean up
      Q.longStackSupport = false;
    });
  });
});