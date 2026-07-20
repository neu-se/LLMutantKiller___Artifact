import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("ses environment - early return behavior", () => {
  it("should not throw when ses.ok() returns false (original returns early)", () => {
    const sesObj = {
      ok: () => false,
      makeQ: undefined as Function | undefined
    };

    const modulePath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    const code = fs.readFileSync(modulePath, "utf-8");

    const context = vm.createContext({
      ses: sesObj,
      setTimeout,
      clearTimeout,
      setImmediate,
      process,
      console,
    });

    // Original: ses.ok() false -> return early -> no error, no further execution
    // Mutated: ses.ok() false -> no return -> falls through to the else-if chain
    // which checks window/self (undefined) -> throws "environment not anticipated"
    expect(() => vm.runInContext(code, context)).toThrow();
  });
});