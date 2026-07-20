import { execSync } from "child_process";
import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q browser global setup", () => {
  it("should load successfully when only window is defined (not self), using the || condition", () => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf-8"
    );

    // Simulate a browser environment where window is defined but self is not
    // In the original code (||), this should work fine
    // In the mutated code (&&), this would fall through to the else branch and throw
    const sandbox: Record<string, unknown> = {
      window: { Q: undefined },
      // self is intentionally NOT defined
    };

    // We need to run the module without CommonJS exports available
    // Wrap the source to remove CommonJS detection
    const modifiedSource = qSource
      .replace(
        `} else if (typeof exports === "object" && typeof module === "object") {`,
        `} else if (false) {`
      )
      .replace(
        `} else if (typeof define === "function" && define.amd) {`,
        `} else if (false) {`
      )
      .replace(
        `} else if (typeof ses !== "undefined") {`,
        `} else if (false) {`
      );

    const context = vm.createContext(sandbox);

    // This should not throw with the original || condition
    // With the mutated && condition, it would throw because self is undefined
    expect(() => {
      vm.runInContext(modifiedSource, context);
    }).not.toThrow();

    // Also verify that Q was set on the window object
    expect((sandbox.window as { Q: unknown }).Q).toBeDefined();
  });
});