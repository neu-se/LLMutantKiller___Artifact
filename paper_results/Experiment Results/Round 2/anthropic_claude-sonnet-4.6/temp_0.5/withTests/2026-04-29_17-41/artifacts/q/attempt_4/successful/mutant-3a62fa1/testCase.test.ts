import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q nextTick process detection", () => {
  it("loads without error in a context where process is not an object", () => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf8"
    );
    
    // Create a context where process is not an object (e.g., a number)
    // Original: typeof 42 === "object" → false → short circuits → safe
    // Mutated: true && 42.nextTick → undefined → false → safe (auto-boxing)
    // Hmm, still same...
    
    // What if process is completely absent?
    const context = vm.createContext({
      // No process, no window, no self
      // This simulates an environment where process doesn't exist
      exports: {},
      module: { exports: {} },
      require: require,
      console: console,
      setTimeout: setTimeout,
      setImmediate: setImmediate,
    });
    
    let error: Error | null = null;
    try {
      vm.runInContext(qSource, context);
    } catch(e: any) {
      error = e;
    }
    
    // Original: typeof process === "object" where process is undefined → false → safe
    // Mutated: true && process.nextTick where process is undefined → TypeError
    expect(error).toBeNull();
  });
});