import { describe, it, expect } from "@jest/globals";

describe("Q captureLine graceful handling", () => {
  it("should load successfully even when stack trace lines are unparseable", () => {
    const OriginalError = global.Error;
    
    // Produce a stack with lines that don't match any regex in getFileNameAndLineNumber
    const mockStack = "Error\nunparseable\nalso unparseable\n";
    
    class FakeError {
      message: string;
      stack: string;
      constructor(msg?: string) {
        this.message = msg || "";
        this.stack = mockStack;
      }
    }
    
    // Replace global Error before module loads
    (global as any).Error = FakeError;
    
    jest.resetModules();
    
    let caughtError: any = null;
    let loadedQ: any = null;
    
    try {
      loadedQ = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } catch (e) {
      caughtError = e;
    } finally {
      (global as any).Error = OriginalError;
    }
    
    // In original: if (!fileNameAndLineNumber) { return; } → graceful, no error
    // In mutated:  if (!fileNameAndLineNumber) {}          → continues, throws TypeError
    expect(caughtError).toBeNull();
    expect(loadedQ).toBeDefined();
  });
});