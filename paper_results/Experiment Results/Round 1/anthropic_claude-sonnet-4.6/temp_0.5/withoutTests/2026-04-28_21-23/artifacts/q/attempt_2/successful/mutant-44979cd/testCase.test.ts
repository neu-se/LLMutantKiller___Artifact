import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q module loading", () => {
  it("should throw when exports is not an object and no other environment is available", () => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf-8"
    );

    const context: any = {
      module: { exports: {} },
      exports: "not-an-object",
    };

    vm.createContext(context);

    // Original code: typeof exports === "object" is false (exports is a string),
    // so it skips the CommonJS branch and falls through to the throw at the end.
    // Mutated code: true && typeof module === "object" is true,
    // so it enters the CommonJS branch and sets module.exports = definition(),
    // which does NOT throw.
    let threw = false;
    try {
      vm.runInContext(qSource, context);
    } catch (e: any) {
      threw = true;
      expect(e.message).toBe("This environment was not anticipated by Q. Please file a bug.");
    }
    expect(threw).toBe(true);
  });
});