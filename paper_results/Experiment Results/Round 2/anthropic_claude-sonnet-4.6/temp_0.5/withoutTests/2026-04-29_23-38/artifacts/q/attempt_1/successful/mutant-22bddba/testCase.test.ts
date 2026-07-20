import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q module window/self environment detection", () => {
  it("should use window global when window is defined but self is not defined", () => {
    // Read the Q source file
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf-8"
    );

    // Create a context where:
    // - bootstrap is not a function (skip bootstrap branch)
    // - exports/module are not objects (skip CommonJS branch)
    // - define is not a function (skip RequireJS branch)
    // - ses is undefined (skip SES branch)
    // - window IS defined (should trigger the window branch in original)
    // - self is NOT defined (should NOT trigger in mutated code)
    const mockWindow: Record<string, unknown> = {};
    const context = {
      window: mockWindow,
      // self is intentionally NOT defined
      bootstrap: undefined,
      exports: undefined,
      module: undefined,
      define: undefined,
      ses: undefined,
    };

    // In the original code: window is defined, so the branch executes and sets window.Q
    // In the mutated code: false || typeof self !== "undefined" => false, so it throws an error
    
    let threwError = false;
    try {
      vm.runInNewContext(qSource, context);
    } catch (e) {
      threwError = true;
    }

    // Original code should NOT throw (it finds window and sets Q on it)
    // Mutated code SHOULD throw ("This environment was not anticipated by Q")
    expect(threwError).toBe(false);
    
    // Additionally verify that Q was set on the window object
    expect(mockWindow.Q).toBeDefined();
    expect(typeof mockWindow.Q).toBe("function");
  });
});