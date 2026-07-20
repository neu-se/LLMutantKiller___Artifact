import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Long stack traces mutation test", () => {
  it("should properly traverse promise chain for long stack traces", () => {
    // Import Q directly from the module
    const QModule = require("../../../../../../../../../../../subject_repositories/q/q.js");
    const Q = QModule;

    // Enable long stack traces
    Q.longStackSupport = true;

    let error: Error | undefined;

    function createPromiseChain() {
      return Q().then(() => {
        return Q.Promise<void>((resolve: any, reject: any) => {
          Q().then(() => {
            return Q.reject(new Error("Test error"));
          }).then(() => {
            resolve();
          }, (err: any) => {
            reject(err);
          });
        });
      });
    }

    return createPromiseChain()
      .then(() => {
        throw new Error("Should not reach here");
      }, (err: any) => {
        error = err;
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
});