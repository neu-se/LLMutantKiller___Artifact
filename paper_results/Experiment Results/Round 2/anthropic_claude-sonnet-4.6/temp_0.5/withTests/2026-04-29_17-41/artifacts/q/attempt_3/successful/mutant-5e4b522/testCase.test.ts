import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q browser branch condition", () => {
  it("should not enter the browser global branch when window is undefined", () => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf-8"
    );

    // Simulate an environment where CommonJS is NOT available but window IS defined as undefined
    // The original code checks `typeof window !== "undefined"` which would be false
    // The mutated code checks `typeof window !== ""` which would be true
    // We simulate a non-CommonJS, non-RequireJS, non-ses environment
    // and check whether the browser branch throws or not

    const sandbox: Record<string, unknown> = {
      // No exports, no module, no define, no ses, no bootstrap
      // No window, no self either - so original falls to throw
      // But mutated: typeof window !== "" is true (since typeof window === "undefined" !== "")
      // so it tries to access window/self globals and throws differently
    };

    // In original: typeof window !== "undefined" => false, typeof self !== "undefined" => false
    // Falls to else: throws "This environment was not anticipated by Q"
    // In mutated: typeof window !== "" => true (always!)
    // Enters browser branch, tries `typeof window !== "undefined" ? window : self`
    // window is not defined in sandbox => ReferenceError OR returns undefined
    // Then tries global.Q = definition() which may fail differently

    expect(() => {
      vm.runInNewContext(qSource, sandbox);
    }).toThrow("This environment was not anticipated by Q");
  });
});