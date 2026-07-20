import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q browser branch condition", () => {
  it("should throw 'not anticipated' error when window and self are both undefined (non-CommonJS environment)", () => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf-8"
    );

    // Create a sandbox with no CommonJS, no window, no self, no define, no ses, no bootstrap
    // In original code: (typeof window !== "undefined" || typeof self !== "undefined")
    //   = (false || false) = false → falls to else → throws error
    // In mutated code: (typeof window !== "undefined" || typeof self === "undefined")
    //   = (false || true) = true → enters browser branch → tries to access self → different behavior
    const sandbox = vm.createContext({});

    expect(() => {
      vm.runInContext(qSource, sandbox);
    }).toThrow("This environment was not anticipated by Q. Please file a bug.");
  });
});