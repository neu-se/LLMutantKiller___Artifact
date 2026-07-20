import * as vm from "vm";
import * as fs from "fs";

describe("array_reduce fallback", () => {
  it("throws TypeError on empty array without initial value in original code", () => {
    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    let qSource = fs.readFileSync(qPath, "utf-8");
    
    // Expose array_reduce for direct testing
    qSource = qSource.replace(
      "return Q;\n\n});",
      "Q._arrayReduce = array_reduce;\nreturn Q;\n\n});"
    );
    
    const sandbox = {
      module: { exports: {} as any },
      exports: {} as any,
      process: global.process,
      setTimeout: global.setTimeout,
      clearTimeout: global.clearTimeout,
      setImmediate: global.setImmediate,
      console: global.console,
    };
    const context = vm.createContext(sandbox);
    
    // Delete Array.prototype.reduce so Q uses its fallback implementation
    const originalReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;
    try {
      vm.runInContext(qSource, context);
    } finally {
      Array.prototype.reduce = originalReduce;
    }
    
    const arrayReduce = sandbox.module.exports._arrayReduce;
    
    // Original: if (index in this) → 0 in [] is false → ++index >= length(0) → throws TypeError
    // Mutated:  if (true) → basis = [][0] = undefined → break → returns undefined (no throw)
    let threw = false;
    try {
      arrayReduce([], (a: any, b: any) => b);
    } catch (e) {
      threw = true;
    }
    expect(threw).toBe(true);
  });
});