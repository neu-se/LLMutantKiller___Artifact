import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q module loading in non-CommonJS environment", () => {
  it("should throw an error when no module system and no window/self is available", () => {
    const qPath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    const code = fs.readFileSync(qPath, "utf8");
    
    const sandbox = vm.createContext({
      // No exports, module, define, ses, bootstrap, window, self
      setTimeout,
      clearTimeout,
      process: undefined,
    });
    
    expect(() => vm.runInContext(code, sandbox)).toThrow("This environment was not anticipated by Q");
  });
});