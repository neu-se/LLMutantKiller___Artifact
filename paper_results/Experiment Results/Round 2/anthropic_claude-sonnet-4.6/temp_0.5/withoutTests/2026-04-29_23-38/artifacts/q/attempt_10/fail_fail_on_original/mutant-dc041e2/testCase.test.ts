import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q ses branch", () => {
  it("should invoke ses.ok differently based on mutation", () => {
    const qSource = fs.readFileSync(
      path.join(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf-8"
    );

    // Find the actual ses.ok usage in source to understand structure
    const sesOkPos = qSource.indexOf("ses.ok");
    const surrounding = qSource.substring(sesOkPos - 100, sesOkPos + 200);
    
    // Run with ses.ok returning false and track if noConflict gets set
    // noConflict is only set in the window/self branch
    const sandbox1: Record<string, unknown> = {
      ses: { ok: () => false },
      console,
      setTimeout,
      clearTimeout, 
      setImmediate,
    };
    // Make window point to sandbox so global.Q = definition() sets sandbox.Q
    const context1 = vm.createContext(sandbox1);
    // Inject window as the context global itself
    vm.runInContext("var window = this; var self = this;", context1);
    vm.runInContext(qSource, context1);
    const hasQWithFalse = vm.runInContext("typeof Q !== 'undefined'", context1);

    // Run with ses.ok returning true
    const sandbox2: Record<string, unknown> = {
      ses: { ok: () => true },
      console,
      setTimeout,
      clearTimeout,
      setImmediate,
    };
    const context2 = vm.createContext(sandbox2);
    vm.runInContext("var window = this; var self = this;", context2);
    vm.runInContext(qSource, context2);
    const hasQWithTrue = vm.runInContext("typeof Q !== 'undefined'", context2);

    // Original: if (!ses.ok())
    //   ses.ok()=false => !false=true => enters block (window setup inside) => Q defined
    //   ses.ok()=true  => !true=false => skips block => Q NOT defined
    // Mutated: if (ses.ok())
    //   ses.ok()=false => false => skips block => Q NOT defined  
    //   ses.ok()=true  => true  => enters block (window setup inside) => Q defined

    // In original: hasQWithFalse=true, hasQWithTrue=false
    // In mutated:  hasQWithFalse=false, hasQWithTrue=true
    
    // Test that passes original, fails mutated:
    expect(hasQWithFalse).toBe(true);
    expect(hasQWithTrue).toBe(false);
  });
});