describe("array_reduce shim no-initial-value path", () => {
  it("uses first element as basis when no initial value is provided", () => {
    const nativeReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;

    const Module = require("module");
    const originalCompile = Module.prototype._compile;

    Module.prototype._compile = function (content: string, filename: string) {
      if (filename && filename.endsWith("q.js")) {
        content = content.replace(
          "return Q;\n\n});",
          "Q._test_array_reduce = array_reduce; return Q;\n\n});"
        );
      }
      return originalCompile.call(this, content, filename);
    };

    jest.resetModules();
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js") as any;

    Module.prototype._compile = originalCompile;
    Array.prototype.reduce = nativeReduce;

    // Call array_reduce with 2 args (no initial value) - triggers the mutated path
    // Original: basis = this[index++]; break; -> correctly uses first element
    // Mutated: empty if block -> ++index runs until TypeError thrown
    const result = Q._test_array_reduce(
      [10, 20, 30],
      (acc: number, val: number) => acc + val
    );
    expect(result).toBe(60);
  });
});