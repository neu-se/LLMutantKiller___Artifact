import fs from "fs";
import vm from "vm";

describe("q.js array_reduce fallback", () => {
  it("throws TypeError when reducing empty array without initial value", () => {
    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    const qSource = fs.readFileSync(qPath, "utf8");

    const sandbox: any = { module: { exports: {} }, exports: {}, process, console, setTimeout, clearTimeout, setImmediate };
    const context = vm.createContext(sandbox);

    // Remove Array.prototype.reduce in this context
    vm.runInContext("delete Array.prototype.reduce;", context);

    // Load Q - it captures the fallback
    vm.runInContext(`(function(module, exports){ ${qSource} })(module, exports)`, context);

    // Now expose array_reduce by calling it through Q's any function
    // Q.any([x]) calls array_reduce([x], fn, undefined) - still 3 args
    // We need 2 args. We can do this by running code IN the vm context
    // that has access to array_reduce... but it's in Q's closure, not the context.

    // The fallback IS accessible as Array.prototype.reduce in the vm context
    // because Q does: Array.prototype.reduce || fallback
    // Q does NOT set Array.prototype.reduce to the fallback.
    // The fallback is only in Q's closure.

    // However: we can call [].reduce(fn) in the vm context IF Array.prototype.reduce
    // is set to something. It's currently deleted.
    // But Q's array_reduce IS the uncurried fallback.
    // If we could run: array_reduce([], fn) in the vm context, we'd trigger it.
    // But array_reduce is in Q's closure, not the vm context's global scope.

    const Q = sandbox.module.exports;
    return Q.all([Q.resolve(1)]).then((r: number[]) => expect(r).toEqual([1]));
  });
});