import fs from "fs";

describe("array_reduce polyfill", () => {
  it("uses first element as basis when called without initial value", () => {
    const originalReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;

    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    const source = fs.readFileSync(qPath, "utf8");
    // Use the unique ending line
    const patched = source.replace(
      "var qEndingLine = captureLine();\n\nreturn Q;",
      "var qEndingLine = captureLine();\nQ.__array_reduce = array_reduce;\nreturn Q;"
    );

    const mod = { exports: {} as any };
    const fn = new Function("module", "exports", "require", "process", patched);
    fn(mod, mod.exports, require, process);
    Array.prototype.reduce = originalReduce;

    const QFresh = mod.exports;
    // array_reduce(arr, fn) with no initial value
    // Original: basis = arr[0] = 1, result = 6
    // Mutated: basis = undefined, result = NaN
    const result = QFresh.__array_reduce([1, 2, 3], (a: number, b: number) => a + b);
    expect(result).toBe(6);
  });
});