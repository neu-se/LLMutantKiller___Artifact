import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q browser environment loading", () => {
  it("should load Q when only self is defined (not window)", () => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf-8"
    );
    
    const selfObj: Record<string, any> = {};
    // Explicitly create a minimal sandbox with NO window, NO module/exports (no CommonJS)
    // Only self is defined - original || condition passes, mutated && condition fails
    const sandbox = vm.createContext({
      self: selfObj,
      setTimeout: setTimeout,
      clearTimeout: clearTimeout,
      setImmediate: setImmediate,
      process: process,
      // Explicitly no: window, module, exports, define, bootstrap, ses
    });
    
    // Original (||): typeof window !== "undefined" || typeof self !== "undefined"
    //   => false || true => true => Q set on self, no throw
    // Mutated (&&): typeof window !== "undefined" && typeof self !== "undefined"  
    //   => false && true => false => falls to else => throws Error
    expect(() => vm.runInContext(qSource, sandbox)).not.toThrow();
    expect(selfObj.Q).toBeDefined();
    expect(typeof selfObj.Q).toBe("function");
  });
});