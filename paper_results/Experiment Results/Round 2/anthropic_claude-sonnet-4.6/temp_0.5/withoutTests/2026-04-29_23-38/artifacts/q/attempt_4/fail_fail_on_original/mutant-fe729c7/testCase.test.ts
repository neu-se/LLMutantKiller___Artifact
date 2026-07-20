import * as vm from "vm";
import * as fs from "fs";

describe("array_reduce fallback mutation detection", () => {
  it("original throws TypeError on empty array, mutated does not", () => {
    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    let qSource = fs.readFileSync(qPath, "utf-8");
    
    // Add an export of array_reduce at the end
    qSource = qSource.replace(
      'return Q;\n\n});',
      'Q._array_reduce = array_reduce;\nreturn Q;\n\n});'
    );
    
    const context = vm.createContext({
      module: { exports: {} },
      exports: {},
      process,
      setTimeout,
      clearTimeout,
      setImmediate,
      console,
      Array: {
        ...Array,
        prototype: Object.create(Array.prototype, {
          reduce: { value: undefined, writable: true, configurable: true }
        })
      }
    });
    
    vm.runInContext(qSource, context);
    const Q = (context as any).module.exports;
    
    // Now test array_reduce on empty array without initial value
    expect(() => Q._array_reduce([], x => x)).toThrow(TypeError);
  });
});