import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q script tag fallback branch", () => {
  it("should throw an error when loaded without CommonJS/AMD/window/self", () => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf8"
    );

    // Sandbox with no window, no self, no exports, no module, no define, no ses, no bootstrap
    // Original condition: typeof window !== "undefined" || typeof self !== "undefined"
    //   => false || false => false => falls to else => throws Error
    // Mutated condition: typeof window !== "undefined" || typeof self === "undefined"
    //   => false || true => true => enters browser branch => no throw (tries to use global.Q)
    const sandbox: Record<string, unknown> = {};

    expect(() => {
      vm.runInNewContext(qSource, sandbox);
    }).toThrow("This environment was not anticipated by Q. Please file a bug.");
  });
});