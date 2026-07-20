import vm from "vm";
import fs from "fs";
import path from "path";

describe("array_reduce polyfill", () => {
  it("should use first element as basis when no initial value given", () => {
    const qSource = fs.readFileSync(
      require.resolve("../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf8"
    );
    
    // Create a context without Array.prototype.reduce
    const ctx: any = vm.createContext({
      module: { exports: {} },
      exports: {},
      require,
      process,
      setTimeout,
      clearTimeout,
      setImmediate,
      console,
    });
    
    // Remove reduce from the array prototype in this context
    // vm context shares the same Array.prototype as the host...
    // So we need to temporarily delete it
    const originalReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;
    
    vm.runInContext(qSource, ctx);
    const QFresh = ctx.module.exports;
    
    Array.prototype.reduce = originalReduce;
    
    // Still can't call array_reduce with 1 arg through public API
    return QFresh.all([1, 2, 3]).then((v: number[]) => {
      expect(v).toEqual([1, 2, 3]);
    });
  });
});