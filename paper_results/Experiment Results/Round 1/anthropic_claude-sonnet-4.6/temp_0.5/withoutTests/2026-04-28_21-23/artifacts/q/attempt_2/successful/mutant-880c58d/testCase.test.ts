import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.longStackSupport", () => {
  it("should default to false when Q_DEBUG environment variable is not set", () => {
    // Ensure Q_DEBUG is not set so we test the default behavior
    const originalQDebug = process.env.Q_DEBUG;
    delete process.env.Q_DEBUG;

    // Re-require the module fresh without Q_DEBUG
    jest.resetModules();
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const freshQ = require("../../../../../../../../../../../subject_repositories/q/q.js");

    try {
      // In original code: Q_DEBUG not set => longStackSupport stays false
      // In mutated code: always set to true regardless of Q_DEBUG
      expect(freshQ.longStackSupport).toBe(false);
    } finally {
      if (originalQDebug !== undefined) {
        process.env.Q_DEBUG = originalQDebug;
      }
    }
  });
});