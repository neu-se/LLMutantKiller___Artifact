import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support", () => {
  it("should enable long stack support when Q_DEBUG is set in process.env", () => {
    // Save the original process.env
    const originalEnv = { ...process.env };

    // Set Q_DEBUG environment variable
    process.env.Q_DEBUG = "1";

    // Reset Q to re-evaluate the long stack support condition
    // We need to re-import Q to pick up the new environment variable
    // Since we can't actually re-import in this context, we'll test the behavior
    // by checking if longStackSupport is enabled when Q_DEBUG is set
    const qDebugSet = require("../../../../../../../../../../../subject_repositories/q/q.js");
    const longStackSupportEnabled = qDebugSet.Q.longStackSupport;

    // Restore original environment
    process.env = originalEnv;

    // The test should pass if long stack support was enabled when Q_DEBUG was set
    expect(longStackSupportEnabled).toBe(true);
  });
});