import { jest } from "@jest/globals";

describe("Q captureLine", () => {
  it("loads without error when getFileNameAndLineNumber returns null", () => {
    const OriginalError = global.Error;
    
    // Produce a stack where no line matches the regexes in getFileNameAndLineNumber
    // so that fileNameAndLineNumber will be null/undefined
    class FakeError extends OriginalError {
      constructor(msg?: string) {
        super(msg);
        this.stack = "Error\n    <anonymous>\n    <anonymous>";
      }
    }
    (global as any).Error = FakeError;
    
    jest.resetModules();
    
    let loadError: unknown;
    let mod: unknown;
    try {
      mod = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } catch (e) {
      loadError = e;
    } finally {
      (global as any).Error = OriginalError;
    }
    
    // Original code: captureLine returns undefined gracefully -> module loads fine
    // Mutated code: captureLine tries fileNameAndLineNumber[0] on null -> TypeError -> module fails
    expect(loadError).toBeUndefined();
    expect(mod).toBeDefined();
  });
});