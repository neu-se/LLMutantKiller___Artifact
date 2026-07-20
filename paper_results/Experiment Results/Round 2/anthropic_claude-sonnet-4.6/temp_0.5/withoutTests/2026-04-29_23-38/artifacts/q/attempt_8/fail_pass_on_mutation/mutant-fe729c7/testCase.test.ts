import * as vm from "vm";
import * as fs from "fs";

describe("array_reduce fallback", () => {
  it("returns correct basis from sparse array without initial value", () => {
    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    let qSource = fs.readFileSync(qPath, "utf-8");

    qSource = qSource.replace(
      /return Q;\s*\n\s*\}\);/,
      "Q._arrayReduce = array_reduce;\nreturn Q;\n\n});"
    );

    const sandbox: any = {
      module: { exports: {} },
      exports: {},
      process: global.process,
      setTimeout: global.setTimeout,
      clearTimeout: global.clearTimeout,
      setImmediate: global.setImmediate,
      console: global.console,
    };

    const context = vm.createContext(sandbox);
    vm.runInContext("delete Array.prototype.reduce;", context);
    vm.runInContext(qSource, context);

    // Use a sparse array [undefined, 42] where index 0 is not set
    const sparse: any[] = [, 42];
    // Original: if (index in this) → 0 in sparse is false → index becomes 1 → 1 in sparse is true → basis = 42
    // Mutated:  if (true) → basis = sparse[0] = undefined (not 42)
    const result = sandbox.module.exports._arrayReduce(sparse, (_a: any, b: any) => b);
    expect(result).toBe(42);
  });
});