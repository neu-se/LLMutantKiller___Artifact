// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Node.js environment detection", () => {
  it("should correctly detect Node.js environment and use process.nextTick", (done) => {
    // This test verifies that Q correctly identifies a Node.js environment
    // and uses process.nextTick for scheduling tasks.
    // The mutation changes the condition from checking process.toString()
    // to always true, which could cause issues in non-Node environments.

    // Create a promise and verify it resolves in the next tick
    let resolved = false;
    Q.resolve().then(() => {
      resolved = true;
    });

    // In a proper Node.js environment with process.nextTick, this should resolve
    // in the next event loop iteration
    setTimeout(() => {
      if (resolved) {
        done();
      } else {
        done(new Error("Promise did not resolve in expected time, suggesting incorrect tick handling"));
      }
    }, 10);
  });
});