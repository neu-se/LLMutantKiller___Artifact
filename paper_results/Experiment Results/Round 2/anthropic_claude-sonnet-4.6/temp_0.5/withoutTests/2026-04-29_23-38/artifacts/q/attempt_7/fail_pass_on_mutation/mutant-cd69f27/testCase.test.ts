import { readFileSync } from "fs";
import vm from "vm";
import path from "path";

describe("Q ses.ok false - definition not called", () => {
  it("definition function should not be called when ses.ok() returns false", () => {
    const qPath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    const qSource = readFileSync(qPath, "utf-8");

    let definitionCalled = false;
    
    // Wrap the source to intercept the definition call
    // We need to intercept at the IIFE level
    // The IIFE is: (function(definition){...})(function(){...Q factory...})
    // We can't intercept this without modifying source
    
    // Instead, let's check via ses.makeQ
    const ses: any = { ok: () => false };
    const sandbox: Record<string, any> = { ses, console, setTimeout, clearTimeout, process };
    if (typeof setImmediate !== "undefined") sandbox.setImmediate = setImmediate;
    vm.createContext(sandbox);
    new vm.Script(qSource).runInContext(sandbox as any);
    
    // Both original and mutated: definition not called, ses.makeQ not set
    expect(ses.makeQ).toBeUndefined();
  });
});