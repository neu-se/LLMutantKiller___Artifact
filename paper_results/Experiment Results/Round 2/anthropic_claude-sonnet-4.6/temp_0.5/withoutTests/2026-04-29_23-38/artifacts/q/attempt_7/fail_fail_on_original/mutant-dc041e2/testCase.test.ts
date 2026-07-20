import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q ses branch", () => {
  it("should set global Q when ses is defined and ses.ok() returns true", () => {
    const qSource = fs.readFileSync(
      path.join(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf-8"
    );

    // Debug: find the actual structure around the ses check
    const sesIndex = qSource.indexOf("ses !== \"undefined\"");
    const snippet = qSource.substring(sesIndex - 20, sesIndex + 300);
    
    // The actual structure should tell us what branch logic exists
    // Let's check if 'ses.ok' appears in the source
    const sesOkIndex = qSource.indexOf("ses.ok");
    
    // If ses.ok doesn't appear in the source at all in the original,
    // then the mutation adds it, meaning the original has empty ses block
    // and the mutated has if(ses.ok()) check
    
    // Let's check both possibilities by looking at what's actually in the file
    const hasSesOk = qSource.includes("ses.ok");
    
    // Build a wrapper that intercepts which branch runs
    const wrappedSource = `
      var _branchTaken = null;
      var _origExports = typeof exports !== 'undefined' ? exports : undefined;
      var _origModule = typeof module !== 'undefined' ? module : undefined;
      ${qSource}
    `;

    const fakeWindow: Record<string, unknown> = {};
    const sandbox: Record<string, unknown> = {
      ses: { ok: () => true },
      window: fakeWindow,
      self: fakeWindow,
      console,
      setTimeout,
      clearTimeout,
      setImmediate,
    };

    // Override to prevent CommonJS path - use a fresh context with no module/exports
    const context = vm.createContext(sandbox);
    
    // Check if exports is accessible in context
    const testResult = vm.runInContext(`
      var hasExports = typeof exports;
      var hasModule = typeof module;
      hasExports + '|' + hasModule;
    `, context);
    
    // If exports is "undefined" and module is "undefined", ses branch should be reached
    // If not, we need a different approach
    expect(testResult).toBe("undefined|undefined");
    
    vm.runInContext(qSource, context);
    expect(fakeWindow["Q"]).toBeDefined();
  });
});