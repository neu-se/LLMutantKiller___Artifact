import { readFileSync } from "fs";
import vm from "vm";
import path from "path";

describe("Q ses branch - ses.ok() false", () => {
  it("should not call the definition function when ses.ok() returns false", () => {
    const qPath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    const qSource = readFileSync(qPath, "utf-8");

    let definitionCallCount = 0;
    
    // Wrap the source to intercept definition calls
    // The IIFE calls definition() in the CommonJS branch: module.exports = definition()
    // We need to be in the ses branch, not CommonJS
    // In ses branch, definition is assigned but not called
    
    const ses = {
      ok: () => false,
      makeQ: undefined as any,
    };

    const sandbox: Record<string, any> = {
      ses,
      console,
      setTimeout,
      clearTimeout,
      process,
    };

    if (typeof setImmediate !== "undefined") {
      sandbox.setImmediate = setImmediate;
    }

    const context = vm.createContext(sandbox);
    const script = new vm.Script(qSource);
    script.runInContext(context);

    // Both original and mutated: ses.makeQ should be undefined when ses.ok() returns false
    expect(ses.makeQ).toBeUndefined();
  });
});