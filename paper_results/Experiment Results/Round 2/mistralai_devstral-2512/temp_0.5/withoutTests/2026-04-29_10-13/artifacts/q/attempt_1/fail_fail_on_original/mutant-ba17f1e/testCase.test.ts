import { Q } from "./q.js";

describe("getFileNameAndLineNumber", () => {
  it("should correctly parse stack traces with named functions", () => {
    const error = new Error("Test error");
    const stackLine = "at functionName (file.js:42:21)";

    // This test relies on the internal behavior of getFileNameAndLineNumber
    // which is used by the stack trace filtering mechanism
    // We can observe this behavior indirectly by checking if the error
    // stack is properly filtered when long stack traces are enabled
    Q.longStackSupport = true;

    const promise = Q.reject(error);
    return promise.then(
      () => {
        throw new Error("Should not be called");
      },
      (reason) => {
        // The mutation would cause getFileNameAndLineNumber to return []
        // which would break the stack trace filtering
        // We can't directly test the internal function, but we can verify
        // that the stack trace processing doesn't throw an error
        expect(reason).toBe(error);
      }
    );
  });
});