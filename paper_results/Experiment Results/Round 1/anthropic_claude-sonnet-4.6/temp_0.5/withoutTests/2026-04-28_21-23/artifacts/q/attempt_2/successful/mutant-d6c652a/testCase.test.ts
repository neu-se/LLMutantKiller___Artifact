import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q captureLine early return when hasStacks is false", () => {
  it("should not throw during module load when Error objects have no stack property", () => {
    const qPath = path.resolve(
      __dirname,
      "../../../../../../../../../../../subject_repositories/q/q.js"
    );
    const qSource = fs.readFileSync(qPath, "utf8");

    // Create an Error class that never sets .stack, so hasStacks will be false
    function NoStackError(this: any, msg?: string) {
      this.message = msg || "";
      // deliberately no .stack
    }
    NoStackError.prototype = Object.create(Error.prototype);

    const sandbox = {
      module: { exports: {} as any },
      exports: {} as any,
      require,
      process,
      setTimeout,
      clearTimeout,
      setImmediate,
      console,
      Error: NoStackError,
    };

    const context = vm.createContext(sandbox);

    // Original: captureLine returns early when !hasStacks -> no crash
    // Mutated: captureLine continues, tries e.stack.split("\n") where e.stack is undefined -> TypeError
    expect(() => vm.runInContext(qSource, context)).not.toThrow();
  });
});