import { describe, it, expect } from "@jest/globals";

describe("ses environment handling", () => {
  it("should return early without executing definition when ses is defined and ses.ok() returns false", () => {
    // In the original code, when `ses` is defined and `ses.ok()` returns false,
    // the module definition returns early (no assignment to ses.makeQ, no window assignment).
    // In the mutated code, the ses block is empty, so it falls through to the window/self check.
    
    // We simulate the behavior by checking what happens when ses is defined with ok() === false.
    // We do this by temporarily setting global.ses and global.window, then re-requiring the module.
    
    const originalSes = (global as any).ses;
    const originalWindow = (global as any).window;
    const originalModule = (global as any).module;
    
    let definitionWasCalled = false;
    
    // Remove module so the CommonJS branch is not taken
    delete (global as any).module;
    
    // Set up a fake ses with ok() returning false
    (global as any).ses = {
      ok: () => false,
      makeQ: undefined
    };
    
    // Set up a fake window to detect if the window branch was taken
    const fakeWindow = {
      Q: undefined as any,
      _qAssigned: false
    };
    Object.defineProperty(fakeWindow, 'Q', {
      set(val: any) {
        fakeWindow._qAssigned = true;
        (fakeWindow as any)._qValue = val;
      },
      get() {
        return (fakeWindow as any)._qValue;
      },
      configurable: true
    });
    (global as any).window = fakeWindow;
    
    try {
      // Clear the require cache so the module is re-evaluated
      const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
      delete require.cache[modulePath];
      
      require("../../../../../../../../../../../subject_repositories/q/q.js");
      
      // In the original code: ses is defined, ses.ok() returns false → return early
      // → window.Q should NOT be set
      // In the mutated code: ses block is empty → falls through to window branch
      // → window.Q WILL be set
      expect(fakeWindow._qAssigned).toBe(false);
    } finally {
      // Restore globals
      if (originalSes === undefined) {
        delete (global as any).ses;
      } else {
        (global as any).ses = originalSes;
      }
      
      if (originalWindow === undefined) {
        delete (global as any).window;
      } else {
        (global as any).window = originalWindow;
      }
      
      if (originalModule !== undefined) {
        (global as any).module = originalModule;
      }
      
      // Restore module cache
      const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
      delete require.cache[modulePath];
    }
  });
});