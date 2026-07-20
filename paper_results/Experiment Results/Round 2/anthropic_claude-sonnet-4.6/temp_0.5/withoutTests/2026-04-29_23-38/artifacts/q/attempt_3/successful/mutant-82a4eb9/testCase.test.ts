import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q module condition", () => {
  it("should fall through to window branch when exports is object but module is not an object", () => {
    const qPath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    const code = fs.readFileSync(qPath, "utf8");

    const windowObj: any = {};
    const context: any = {
      exports: {},
      module: 42, // not an object
      window: windowObj,
      process,
      setTimeout,
      setImmediate,
      console,
    };
    vm.createContext(context);
    vm.runInContext(code, context);
    // Original (&&): condition false → falls to window branch → window.Q is set
    // Mutated (||): condition true → module.exports = definition() on number 42 → window.Q not set
    expect(typeof context.window.Q).toBe("function");
  });
});