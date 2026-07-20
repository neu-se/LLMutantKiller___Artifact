import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support", () => {
  it("should not enable long stack support when process is not an object", () => {
    // Save original env and process
    const originalEnv = { ...process.env };
    const originalProcess = { ...process };

    // Set Q_DEBUG but make process not an object
    process.env.Q_DEBUG = "1";
    const mockProcess = null;
    global.process = mockProcess;

    // Reset Q module to pick up new env
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify long stack support is NOT enabled
    expect(Q.longStackSupport).toBe(false);

    // Restore original env and process
    process.env = originalEnv;
    global.process = originalProcess;
  });
});