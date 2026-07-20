import * as vm from "vm";
import * as fs from "fs";

describe("array_reduce fallback", () => {
  it("throws TypeError on empty array without initial value in original code", () => {
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
    
    // Delete Array.prototype.reduce in the VM's own context
    vm.runInContext("delete Array.prototype.reduce;", context);
    vm.runInContext(qSource, context);
    
    // Original: throws TypeError (0 in [] is false, ++index >= length throws)
    // Mutated:  returns undefined (if(true) takes this[0]=undefined, no throw)
    let threw = false;
    try {
      sandbox.module.exports._arrayReduce([], (_a: any, b: any) => b);
    } catch (e) {
      threw = true;
    }
    expect(threw).toBe(true);
  });
});