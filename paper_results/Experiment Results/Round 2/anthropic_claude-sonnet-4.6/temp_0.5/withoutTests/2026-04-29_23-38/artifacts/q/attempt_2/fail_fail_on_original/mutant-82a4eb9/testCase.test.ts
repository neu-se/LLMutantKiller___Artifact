import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q module condition", () => {
  it("should not execute module.exports branch when module is not an object", () => {
    const code = fs.readFileSync(path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"), "utf8");
    
    // Create context where exports IS an object but module is NOT
    // Original (&&): condition false, won't try module.exports = ...
    // Mutated (||): condition true, will try module.exports = ... on non-object, throws
    const context = {
      exports: {},
      module: "not-an-object", // module is a string, not object
      define: undefined,
      ses: undefined,
      window: undefined,
      self: undefined,
      process: process,
      setTimeout,
      setImmediate,
      console,
    };
    
    vm.createContext(context);
    expect(() => vm.runInContext(code, context)).not.toThrow();
  });
});