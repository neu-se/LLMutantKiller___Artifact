import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q module CommonJS branch", () => {
  it("should require exports to be an object (not just module) for CommonJS branch", () => {
    const qPath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    const code = fs.readFileSync(qPath, "utf-8");
    
    // Create a context where module is an object but exports is NOT an object
    // Original: requires typeof exports === "object" - would skip CommonJS branch
    // Mutated: uses `true` instead - would still enter CommonJS branch
    const fakeModule = { exports: {} };
    const context = vm.createContext({
      module: fakeModule,
      exports: "not-an-object", // exports is a string, not an object
      define: undefined,
      ses: undefined,
      window: undefined,
      self: undefined,
      bootstrap: undefined,
      setTimeout: setTimeout,
      process: process,
      console: console,
    });
    
    // In original: typeof exports === "object" is false (it's a string)
    // So it would fall through to other branches and eventually throw
    // In mutated: true && typeof module === "object" is true
    // So it would call module.exports = definition() successfully
    
    expect(() => {
      vm.runInContext(code, context);
    }).toThrow(); // Original throws because no valid branch matches
    // Mutated would NOT throw because it enters the CommonJS branch
  });
});