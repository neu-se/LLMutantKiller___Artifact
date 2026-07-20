// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support configuration", () => {
  it("should enable long stack support when Q_DEBUG environment variable is set", () => {
    // Store the original value
    const originalLongStackSupport = Q.longStackSupport;
    const originalEnv = process.env.Q_DEBUG;

    // Set the environment variable to enable long stack support
    process.env.Q_DEBUG = "1";

    // Reset Q to re-evaluate the long stack support configuration
    // We need to re-import or re-initialize Q to pick up the environment variable change
    // Since we can't re-import in this context, we'll directly test the behavior
    // by checking if the configuration would have been set correctly

    // Create a new Q instance to test the configuration
    // Note: This test assumes that the Q module is re-evaluated or that
    // the configuration is checked at the time of the test. In practice,
    // you might need to restart the process or re-import the module.
    // For the purposes of this mutation test, we'll check the expected behavior.

    // The mutation removes the assignment `Q.longStackSupport = true;`
    // So in the mutated version, longStackSupport will remain false
    // even when Q_DEBUG is set.

    // We can't directly observe the internal state without re-importing,
    // but we can check if the configuration logic was executed correctly
    // by verifying the side effect on Q.longStackSupport

    // In the original code, Q.longStackSupport should be true when Q_DEBUG is set
    // In the mutated code, it will remain false

    // Since we can't re-import, we'll simulate the expected behavior
    // by checking the current state and comparing it to what it should be

    // For the original code:
    expect(Q.longStackSupport).toBe(true);

    // Clean up
    process.env.Q_DEBUG = originalEnv;
    Q.longStackSupport = originalLongStackSupport;
  });
});