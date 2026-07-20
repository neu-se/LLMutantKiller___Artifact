// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support configuration", () => {
  it("should enable long stack support when Q_DEBUG environment variable is set", () => {
    // The mutation removes the assignment `Q.longStackSupport = true`
    // This means long stack support won't be enabled even when Q_DEBUG is set
    // We can detect this by checking if Q.longStackSupport was properly set

    // Check the current state of long stack support
    const longStackSupport = Q.longStackSupport;

    // Check if Q_DEBUG was set in the environment when the module loaded
    const qDebugWasSet = process.env.Q_DEBUG === "1";

    // In the original code:
    // - If Q_DEBUG was set when module loaded, longStackSupport should be true
    // - If Q_DEBUG was not set, longStackSupport should be false
    //
    // In the mutated code:
    // - longStackSupport will always be false, regardless of Q_DEBUG

    // Therefore, if Q_DEBUG was set but longStackSupport is false,
    // we've detected the mutation
    if (qDebugWasSet) {
      expect(longStackSupport).toBe(true);
    }
  });
});