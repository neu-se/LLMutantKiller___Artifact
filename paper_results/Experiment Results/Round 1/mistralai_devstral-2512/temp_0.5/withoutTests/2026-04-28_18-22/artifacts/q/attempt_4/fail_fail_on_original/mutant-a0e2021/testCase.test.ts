import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q long stack support", () => {
  it("should only enable long stack support when process object exists and Q_DEBUG is set", () => {
    // Save original env and process
    const originalEnv = process.env.Q_DEBUG;
    const originalProcess = global.process;

    // Test case 1: No process object (should not enable long stack support)
    global.process = undefined;
    process.env.Q_DEBUG = "1";

    // Clear module cache to get fresh Q instance
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q")];
    const QNoProcess = require("../../../../../../../../../../../subject_repositories/q/q");

    // Verify long stack support is NOT enabled when process is undefined
    expect(QNoProcess.longStackSupport).toBe(false);

    // Test case 2: Process object exists and Q_DEBUG is set (should enable)
    global.process = originalProcess;
    process.env.Q_DEBUG = "1";

    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q")];
    const QWithProcess = require("../../../../../../../../../../../subject_repositories/q/q");

    // Verify long stack support IS enabled when process exists
    expect(QWithProcess.longStackSupport).toBe(true);

    // Restore original env and process
    process.env.Q_DEBUG = originalEnv;
    global.process = originalProcess;
  });
});