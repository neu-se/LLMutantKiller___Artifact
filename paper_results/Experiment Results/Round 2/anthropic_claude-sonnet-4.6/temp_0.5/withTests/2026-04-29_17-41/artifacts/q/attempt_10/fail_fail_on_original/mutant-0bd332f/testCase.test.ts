import fs from "fs";
import vm from "vm";

describe("q.js array_reduce fallback", () => {
  it("throws TypeError when reducing empty array without initial value", () => {
    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    const qSource = fs.readFileSync(qPath, "utf8");
    
    // Inject Q._ar = array_reduce right before "return Q;" at the end of the definition function
    // The definition function ends with: "var qEndingLine = captureLine();\n\nreturn Q;"
    const injected = qSource.replace(
      "var qEndingLine = captureLine();",
      "var qEndingLine = captureLine(); Q._ar = array_reduce;"
    );
    
    const sandbox: any = { module: { exports: {} }, exports: {}, process, console, setTimeout, clearTimeout, setImmediate };
    const context = vm.createContext(sandbox);
    vm.runInContext("delete Array.prototype.reduce;", context);
    vm.runInContext(`(function(module,exports){${injected}})(module,exports)`, context);
    
    const Q = sandbox.module.exports;
    
    // array_reduce([], fn) with 2 args -> fallback.call([], fn) -> 1 arg -> triggers bug
    // Original: throws TypeError
    // Mutant: infinite loop -> Jest timeout -> test fails
    expect(() => Q._ar([], (a: any) => a)).toThrow(TypeError);
  });
});