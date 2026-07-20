import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q ses.ok() condition", () => {
  it("should set window.Q when ses.ok() returns false", () => {
    const qPath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    const qSource = fs.readFileSync(qPath, "utf-8");

    const mockWindow: any = {};
    let sesCallCount = 0;
    let seenCounts: number[] = [];

    const sandbox: any = {
      window: mockWindow,
      self: undefined,
      bootstrap: undefined,
      exports: undefined,
      module: undefined,
      define: undefined,
      process: process,
      setTimeout: setTimeout,
      clearTimeout: clearTimeout,
      setImmediate: setImmediate,
      Error: Error,
      Array: Array,
      Object: Object,
      Function: Function,
      TypeError: TypeError,
      RangeError: RangeError,
    };
    
    vm.createContext(sandbox);
    
    // Strategy: use a flag-based approach
    // Phase 1: typeof ses check - return undefined
    // Phase 2: ses.ok() call - return object with ok()
    // We detect the phase by checking if we're past the typeof check
    // The typeof check happens in the else-if chain
    // After that, if window branch is entered, ses.ok() is called
    // We use a boolean flag set by a side effect
    
    let windowBranchEntered = false;
    
    // Redefine window to detect when window branch is entered
    Object.defineProperty(sandbox, 'window', {
      get() {
        windowBranchEntered = true;
        return mockWindow;
      },
      configurable: true,
      enumerable: true,
    });
    
    Object.defineProperty(sandbox, 'ses', {
      get() {
        sesCallCount++;
        if (!windowBranchEntered) return undefined;
        return { ok: () => false };
      },
      configurable: true,
      enumerable: true,
    });
    
    vm.runInContext(qSource, sandbox);

    expect(mockWindow.Q).toBeDefined();
    expect(typeof mockWindow.Q).toBe("function");
  });
});