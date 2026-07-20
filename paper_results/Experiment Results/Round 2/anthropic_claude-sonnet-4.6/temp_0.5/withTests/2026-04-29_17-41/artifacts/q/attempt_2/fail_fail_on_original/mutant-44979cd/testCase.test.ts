import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q module loading condition", () => {
  it("should not load via CommonJS branch when exports is not an object", () => {
    const qSource = fs.readFileSync(path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"), "utf8");
    
    // Create a context where exports is NOT an object but module IS an object
    // Original: requires typeof exports === "object" - would skip CommonJS branch
    // Mutated: uses `true` - would enter CommonJS branch and try module.exports = definition()
    const fakeModule = { exports: {} };
    const context = vm.createContext({
      exports: "not-an-object", // exports is a string, not an object
      module: fakeModule,
      process: process,
      setTimeout: setTimeout,
      clearTimeout: clearTimeout,
      setImmediate: setImmediate,
    });
    
    vm.runInContext(qSource, context);
    
    // Original: skips CommonJS branch (exports not object), falls through to throw
    // Mutated: enters CommonJS branch, sets module.exports = Q
    // So on original, module.exports stays as {}, on mutated it becomes Q function
    expect(typeof fakeModule.exports).toBe("object");
    expect(typeof fakeModule.exports.defer).toBeUndefined();
  });
});