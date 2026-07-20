import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done mutation test", () => {
  it("should handle process.domain correctly when process is falsy but has domain", () => {
    // Save the original process object
    const originalProcess = global.process;

    // Create a falsy process object with a domain
    global.process = null;
    (global as any).process = { domain: { bind: jest.fn() } };

    const deferred = Q.defer();
    let errorCaught = false;

    try {
      deferred.promise.done(() => {});
    } catch (e) {
      errorCaught = true;
    }

    // Restore original process
    global.process = originalProcess;

    // In original code, no error should be caught (&& prevents evaluation)
    // In mutated code, error would be caught (|| evaluates both sides)
    expect(errorCaught).toBe(false);
  });
});