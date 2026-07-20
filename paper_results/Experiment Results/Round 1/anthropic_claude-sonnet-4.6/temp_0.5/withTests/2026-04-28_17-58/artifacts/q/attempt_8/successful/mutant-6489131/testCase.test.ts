import * as fs from "fs";
import * as path from "path";
import * as vm from "vm";

describe("array_reduce shim no-initial-value path", () => {
  it("uses first element as basis when no initial value is provided", () => {
    const qPath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    let source = fs.readFileSync(qPath, "utf8");

    // Remove native Array.prototype.reduce so Q uses its shim
    const nativeReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;

    // Execute Q in a context where Array.prototype.reduce is undefined
    // so the shim is used, then expose array_reduce
    const modifiedSource = source.replace(
      "return Q;",
      "Q._test_array_reduce = array_reduce; return Q;"
    );

    const moduleObj = { exports: {} as any };
    const wrapper = `(function(module, exports, require) { ${modifiedSource} })`;
    const fn = eval(wrapper);
    fn(moduleObj, moduleObj.exports, require);

    Array.prototype.reduce = nativeReduce;

    const Q = moduleObj.exports as any;

    // Call array_reduce with 2 args (no initial value) - triggers the mutated path
    // Original: basis = this[index++]; break; -> correctly uses first element as 10
    // Mutated: empty if block -> ++index until TypeError
    const result = Q._test_array_reduce(
      [10, 20, 30],
      (acc: number, val: number) => acc + val
    );
    expect(result).toBe(60);
  });
});