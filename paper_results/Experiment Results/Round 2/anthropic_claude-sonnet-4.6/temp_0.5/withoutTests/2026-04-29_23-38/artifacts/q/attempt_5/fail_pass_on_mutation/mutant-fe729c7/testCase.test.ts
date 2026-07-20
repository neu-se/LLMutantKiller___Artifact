import * as vm from "vm";
import * as fs from "fs";

describe("array_reduce fallback mutation detection", () => {
  it("original throws TypeError on empty array, mutated does not", () => {
    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    let qSource = fs.readFileSync(qPath, "utf-8");
    
    qSource = qSource.replace(
      "return Q;\n\n});",
      "Q._arrayReduce = array_reduce;\nreturn Q;\n\n});"
    );
    
    const fakeModule = { exports: {} as any };
    const context = vm.createContext({
      module: fakeModule,
      exports: fakeModule.exports,
      process,
      setTimeout,
      clearTimeout,
      setImmediate,
      console,
    });
    
    vm.runInContext("Array.prototype.reduce = null;", context);
    vm.runInContext(qSource, context);
    
    const Q = fakeModule.exports;
    
    // Original: throws (TypeError from vm context, different class than outer TypeError)
    // Mutated: does not throw
    // Use try/catch instead of toThrow to avoid cross-vm TypeError class mismatch
    let threw = false;
    try {
      Q._arrayReduce([], (acc: any, val: any) => val);
    } catch (e) {
      threw = true;
    }
    expect(threw).toBe(true);
  });
});