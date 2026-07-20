import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q module loading condition", () => {
  it("should throw 'not anticipated' error when exports is object but module is not an object", () => {
    const qPath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    const qCode = fs.readFileSync(qPath, "utf8");

    // Context where exports IS an object but module is NOT an object (a string)
    // Original (&&): false => skips CommonJS branch => falls through all => throws "not anticipated"
    // Mutated (||): true  => enters CommonJS branch => module.exports = ... (no-op on string) => no throw
    const context = vm.createContext({
      exports: {},
      module: "not_an_object",
      define: undefined,
      ses: undefined,
      window: undefined,
      self: undefined,
      process: { env: {}, toString: () => "[object process]" },
      setTimeout,
      clearTimeout,
      setImmediate,
      console,
      Error,
      TypeError,
      Object,
      Array,
      Function,
      Math,
      JSON,
      ReturnValue: undefined,
      MessageChannel: undefined,
    });

    expect(() => {
      vm.runInContext(qCode, context);
    }).toThrow(/not anticipated/);
  });
});