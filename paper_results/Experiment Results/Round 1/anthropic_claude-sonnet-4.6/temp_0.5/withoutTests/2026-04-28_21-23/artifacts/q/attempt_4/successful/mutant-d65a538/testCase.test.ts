describe("Q captureLine", () => {
  it("loads without error when getFileNameAndLineNumber returns null for stack lines", () => {
    const OriginalError = global.Error;

    // Produce a stack where lines don't match any regex in getFileNameAndLineNumber
    // so fileNameAndLineNumber will be null/undefined in captureLine
    class FakeError extends OriginalError {
      constructor(msg?: string) {
        super(msg);
        // Lines that won't match: "at func (file:line:col)", "at file:line:col", or "func@file:line"
        this.stack = "Error\n    no match here\n    no match here either";
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

    // Original: captureLine returns undefined gracefully -> module loads fine
    // Mutated: captureLine tries fileNameAndLineNumber[0] on null -> TypeError -> module fails
    expect(loadError).toBeUndefined();
    expect(mod).toBeDefined();
  });
});