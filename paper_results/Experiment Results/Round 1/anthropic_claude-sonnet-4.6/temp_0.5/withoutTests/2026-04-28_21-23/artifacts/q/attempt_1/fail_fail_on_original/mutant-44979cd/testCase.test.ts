import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q module loading", () => {
  it("should not load as CommonJS module when exports is not an object", () => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf-8"
    );
    
    // Create a context where exports is NOT an object but module IS an object
    // In original code: typeof exports === "object" is false, so it skips CommonJS branch
    // In mutated code: true && typeof module === "object" is true, so it enters CommonJS branch
    const context: any = {
      module: { exports: {} },
      exports: "not-an-object", // exports is a string, not an object
      console,
    };
    
    vm.createContext(context);
    vm.runInContext(qSource, context);
    
    // In original: exports is not an object, so CommonJS branch is skipped
    // The module would fall through to another branch (like window/self or throw)
    // Since there's no window/self/ses/bootstrap/define, it should throw
    // In mutated code: true && typeof module === "object" is true, so module.exports gets set
    expect(context.module.exports).not.toBeInstanceOf(Function);
  });
});