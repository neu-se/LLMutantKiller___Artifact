import { readFileSync } from "fs";
import { join } from "path";
import { runInNewContext } from "vm";

describe("Q module CommonJS condition check", () => {
  it("should throw or use fallback when exports is not an object but module is an object", () => {
    const qSource = readFileSync(join(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"), "utf-8");
    
    // Create a context where exports is NOT an object, but module IS an object
    // Original code: `typeof exports === "object" && typeof module === "object"` -> false, skips CommonJS branch
    // Mutated code: `true && typeof module === "object"` -> true, enters CommonJS branch and tries module.exports = definition()
    const context = {
      exports: "not-an-object", // exports is a string, not an object
      module: { exports: {} },
      require: require,
      result: null as any,
      thrownError: null as any,
    };
    
    // In original: exports is not an object, so CommonJS branch is skipped
    // It will fall to another branch - since window/self/ses/define/bootstrap are undefined,
    // it will throw "This environment was not anticipated by Q"
    // In mutant: true && typeof module === "object" -> enters CommonJS branch, sets module.exports = Q
    let threw = false;
    let errorMessage = "";
    try {
      runInNewContext(qSource, context);
    } catch (e: any) {
      threw = true;
      errorMessage = e.message;
    }
    
    // Original: should throw because no valid environment is detected
    // Mutant: should NOT throw because it takes the CommonJS branch
    expect(threw).toBe(true);
    expect(errorMessage).toContain("not anticipated");
  });
});