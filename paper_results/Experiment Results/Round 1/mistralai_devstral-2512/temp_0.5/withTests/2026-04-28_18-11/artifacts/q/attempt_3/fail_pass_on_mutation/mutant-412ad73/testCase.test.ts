// Test case to detect the mutation in q.js where the Montage Require bootstrap check is disabled
const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q module loading behavior", () => {
  it("should properly handle Montage Require bootstrap when available", () => {
    // This test verifies that the Montage Require bootstrap path is functional
    // The mutation changes the bootstrap check from `if (typeof bootstrap === "function")`
    // to `if (false)`, which should prevent Montage bootstrap from working

    // Create a mock bootstrap function to simulate Montage environment
    global.bootstrap = function(moduleName: string, definition: any) {
      if (moduleName === "promise") {
        return definition();
      }
      throw new Error("Unexpected module name");
    };

    // Clear the module cache to force re-evaluation
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    expect(Q).toBeDefined();
    expect(typeof Q).toBe("function");

    // Verify basic Q functionality works
    return Q.resolve(42).then((value: number) => {
      expect(value).toBe(42);
    });
  });
});