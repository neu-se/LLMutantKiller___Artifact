describe("Q captureLine graceful handling", () => {
  it("should load without throwing when Error stack lines are unparseable", () => {
    const OriginalError = global.Error;

    // Override Error to produce stack lines that getFileNameAndLineNumber cannot parse
    // (none of the three regexes will match "unparseable line")
    (global as any).Error = class {
      message: string;
      stack: string;
      constructor(msg?: string) {
        this.message = msg ?? "";
        this.stack = "Error\nunparseable line\nunparseable line\n";
      }
    };

    jest.resetModules();

    let loadError: unknown = null;
    let Q: unknown;

    try {
      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } catch (e) {
      loadError = e;
    } finally {
      global.Error = OriginalError;
    }

    // Original: `if (!fileNameAndLineNumber) { return; }` → exits gracefully
    // Mutated:  `if (!fileNameAndLineNumber) {}` → falls through, throws TypeError on null[0]
    expect(loadError).toBeNull();
    expect(Q).toBeDefined();
  });
});