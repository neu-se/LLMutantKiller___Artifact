import * as fs from "fs";
import * as path from "path";
import * as vm from "vm";

describe("Q browser global path", () => {
  it("should set Q on window when only window is defined (not self)", () => {
    const qPath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    const code = fs.readFileSync(qPath, "utf8");

    const mockWindow: any = {};

    // Create a context without CommonJS (no exports/module), no AMD (no define),
    // no ses, and with window defined but self NOT defined.
    // Original code uses ||: (window !== undefined || self !== undefined) → true → sets Q on window
    // Mutated code uses &&: (window !== undefined && self !== undefined) → false → throws Error
    const context = vm.createContext({
      window: mockWindow,
      // 'self' is intentionally absent
      setTimeout: setTimeout,
      clearTimeout: clearTimeout,
      setImmediate: setImmediate,
      process: process,
      console: console,
    });

    // Should succeed with original code (||), throw with mutated code (&&)
    vm.runInContext(code, context);

    expect(mockWindow.Q).toBeDefined();
    expect(typeof mockWindow.Q.defer).toBe("function");
  });
});