import * as vm from "vm";
import * as fs from "fs";

describe("array_reduce fallback", () => {
  it("uses first existing element as basis for sparse array", () => {
    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    let qSource = fs.readFileSync(qPath, "utf-8");

    // Patch the source to expose array_reduce AND to record which implementation was used
    qSource = qSource.replace(
      /var array_reduce = uncurryThis\(/,
      "var _reduceWasFalsy = !Array.prototype.reduce;\nvar array_reduce = uncurryThis("
    );
    qSource = qSource.replace(
      /return Q;\s*\n\s*\}\);/,
      "Q._arrayReduce = array_reduce;\nQ._reduceWasFalsy = _reduceWasFalsy;\nreturn Q;\n\n});"
    );

    const testCode = `
      delete Array.prototype.reduce;
      ${qSource}
      // Verify fallback was used
      if (!module.exports._reduceWasFalsy) {
        throw new Error("Native reduce was used, not fallback!");
      }
      // Test: sparse array [,42] - index 0 missing, index 1 = 42
      var sparse = new Array(2);
      sparse[1] = 42;
      var result = module.exports._arrayReduce(sparse, function(a, b) { return b; });
      result;
    `;

    const result = vm.runInNewContext(testCode, {
      module: { exports: {} },
      exports: {},
      process: global.process,
      setTimeout: global.setTimeout,
      clearTimeout: global.clearTimeout,
      setImmediate: global.setImmediate,
      console: global.console,
    });

    // Original: if (index in this) → skips hole at 0, uses 42 as basis → returns 42
    // Mutated:  if (true) → takes sparse[0] = undefined as basis → returns undefined
    expect(result).toBe(42);
  });
});