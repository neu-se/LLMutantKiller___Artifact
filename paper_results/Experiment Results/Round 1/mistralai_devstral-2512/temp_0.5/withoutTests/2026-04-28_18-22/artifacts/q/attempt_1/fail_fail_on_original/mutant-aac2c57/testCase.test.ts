import { Q } from "./q";

describe("Q.done() with process.domain", () => {
  it("should handle unhandled errors correctly when process.domain is present", (done) => {
    // Create a mock process object with a domain
    const mockProcess = {
      domain: {
        bind: (fn: Function) => fn
      }
    };

    // Temporarily replace global.process
    const originalProcess = global.process;
    (global as any).process = mockProcess;

    try {
      const promise = Q.reject(new Error("Test error"));
      let errorCaught = false;

      promise.done(
        () => {},
        (err: Error) => {
          errorCaught = true;
          expect(err.message).toBe("Test error");
        }
      );

      // Give the async operation time to complete
      setTimeout(() => {
        expect(errorCaught).toBe(true);
        (global as any).process = originalProcess;
        done();
      }, 10);
    } catch (err) {
      (global as any).process = originalProcess;
      done(err);
    }
  });
});