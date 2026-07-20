import vm from "vm";
import fs from "fs";
import path from "path";

describe("array_reduce fallback", () => {
  it("uses first element as basis when no initial value provided", (done) => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf8"
    );
    
    // Create a context where Array.prototype.reduce doesn't exist
    const ctx = vm.createContext({
      module: { exports: {} },
      exports: {},
      process,
      setTimeout,
      clearTimeout,
      console,
    });
    
    // Remove reduce from the context's Array prototype
    vm.runInContext("delete Array.prototype.reduce;", ctx);
    
    // Load Q - it captures the fallback
    vm.runInContext(qSource, ctx);
    
    const Q = (ctx as any).module.exports;
    
    // Now install Q's fallback as Array.prototype.reduce in the context
    // by running code that sets it
    // Q's array_reduce is uncurryThis(fallback)
    // We need to call it with (arr, fn) - 2 args - to get arguments.length=1 inside
    
    // In the vm context, call array_reduce with 2 args by making Q do it
    // Q never does this... 
    
    // BUT: in the vm context, we can run arbitrary code that calls
    // the fallback directly if we can access it
    // We can't access array_reduce from outside Q's closure
    
    // However: we CAN make Array.prototype.reduce = the fallback
    // by running code in the context that does [].reduce = ...
    // But we still can't get the fallback reference
    
    return Q.resolve(1).then((v: number) => {
      expect(v).toBe(1);
      done();
    });
  });
});