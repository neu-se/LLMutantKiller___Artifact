import { Q } from "./q.js";

describe("Q.longStackSupport", () => {
  it("should enable long stack traces when Q_DEBUG is set", () => {
    // Simulate setting Q_DEBUG environment variable
    const originalEnv = process.env;
    process.env.Q_DEBUG = "1";

    // Reload Q to pick up the environment variable
    delete require.cache[require.resolve("./q.js")];
    const { Q: QWithDebug } = require("./q.js");

    // Create a chain of promises to test stack trace behavior
    const promise = QWithDebug.resolve()
      .then(() => {
        throw new Error("Test error");
      })
      .catch((err) => {
        // Check if long stack traces are enabled
        expect(err.stack).toContain("From previous event:");
        return QWithDebug.resolve();
      });

    // Restore environment
    process.env = originalEnv;

    return promise;
  });
});