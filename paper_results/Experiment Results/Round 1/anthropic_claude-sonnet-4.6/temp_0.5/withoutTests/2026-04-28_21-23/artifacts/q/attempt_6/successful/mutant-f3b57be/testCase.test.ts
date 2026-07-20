import * as fs from "fs";
import * as path from "path";

describe("array_reduce fallback initial value", () => {
  it("should use first element as basis when called without initial value", () => {
    const qPath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    let qSource = fs.readFileSync(qPath, "utf8");
    
    // Inject export of array_reduce before the final return
    qSource = qSource.replace(
      /return Q;\s*\n\s*\}\);?\s*$/,
      "Q.__array_reduce = array_reduce;\nreturn Q;\n\n});"
    );
    
    // Force Q to use its fallback by making Array.prototype.reduce falsy
    const originalDescriptor = Object.getOwnPropertyDescriptor(Array.prototype, 'reduce');
    Object.defineProperty(Array.prototype, 'reduce', {
      value: undefined,
      configurable: true,
      writable: true,
      enumerable: false
    });
    
    const mod: any = { exports: {} };
    // eslint-disable-next-line no-new-func
    const fn = new Function(
      "module", "exports", "require", "process",
      "setTimeout", "clearTimeout", "setImmediate",
      qSource
    );
    fn(mod, mod.exports, require, process, setTimeout, clearTimeout, setImmediate);
    
    // Restore Array.prototype.reduce
    if (originalDescriptor) {
      Object.defineProperty(Array.prototype, 'reduce', originalDescriptor);
    }
    
    const Q = mod.exports;
    
    // Call array_reduce with 2 args (no initial value)
    // Original: finds first element (1) as basis → 1+2+3 = 6
    // Mutated (if false): basis stays undefined → NaN
    const result = Q.__array_reduce([1, 2, 3], (a: number, b: number) => a + b);
    expect(result).toBe(6);
  });
});