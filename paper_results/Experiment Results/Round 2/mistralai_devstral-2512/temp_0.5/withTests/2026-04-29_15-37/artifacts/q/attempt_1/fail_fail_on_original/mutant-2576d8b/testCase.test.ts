import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Long stack traces", () => {
  it("should include the full promise chain in error stacks when long stack support is enabled", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    let error: Error | undefined;

    try {
      await Q().then(() => {
        return Q.Promise<void>((resolve, reject) => {
          Q().then(() => {
            return Q.reject(new Error("Test error"));
          }).then(() => {
            // This should not be reached
            resolve();
          }, (err) => {
            // Reject with the error to propagate it
            reject(err);
          });
        });
      });
    } catch (err) {
      error = err as Error;
    }

    expect(error).toBeDefined();
    expect(error!.stack).toBeDefined();

    // The stack should contain multiple frames showing the promise chain
    const stackLines = error!.stack!.split('\n');
    expect(stackLines.length).toBeGreaterThan(3);

    // Check for key indicators of long stack traces
    expect(error!.stack).toContain("From previous event:");
    expect(error!.stack).toContain("Test error");

    // Disable long stack traces to clean up
    Q.longStackSupport = false;
  });
});