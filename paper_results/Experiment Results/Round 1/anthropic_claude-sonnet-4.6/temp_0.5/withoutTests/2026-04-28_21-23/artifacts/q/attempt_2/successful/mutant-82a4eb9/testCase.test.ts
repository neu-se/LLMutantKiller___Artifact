import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q module loading condition", () => {
  it("should only use CommonJS branch when both exports AND module are objects", () => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf8"
    );

    // Create a context where exports is an object but module is NOT an object
    // Original (&&): condition false → falls through to next branch (window/self or throws)
    // Mutated (||): condition true → tries module.exports = definition() → throws because module is not object
    const context = {
      exports: {},
      module: "not-an-object", // module is a string, not object
      define: undefined,
      ses: undefined,
      window: undefined,
      self: undefined,
      result: null,
      error: null,
    };

    vm.createContext(context);

    try {
      vm.runInContext(qSource, context);
      context.result = "ran without error";
    } catch (e: any) {
      context.error = e.message;
    }

    // Original code (&&): typeof module === "object" is false for string "not-an-object"
    // So the CommonJS branch is NOT taken, falls through to window/self check,
    // then throws "This environment was not anticipated by Q"
    // Mutated code (||): typeof exports === "object" is true, so branch IS taken,
    // tries module.exports = definition() where module is a string → throws TypeError
    expect(context.error).toContain("This environment was not anticipated by Q");
  });
});