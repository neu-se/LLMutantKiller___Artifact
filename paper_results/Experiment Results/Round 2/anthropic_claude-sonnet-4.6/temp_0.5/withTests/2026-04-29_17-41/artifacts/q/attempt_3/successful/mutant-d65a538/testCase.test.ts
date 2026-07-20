describe("Q captureLine early return guard", () => {
  it("loads module without error when stack lines are unparseable", () => {
    const OriginalError = global.Error;

    // Override Error so its stack won't match any regex in getFileNameAndLineNumber:
    // /at .+ \((.+):(\d+):(?:\d+)\)$/
    // /at ([^ ]+):(\d+):(?:\d+)$/
    // /.*@(.+):(\d+)$/
    const FakeError: any = function (this: any, msg?: string) {
      this.message = msg || "";
      this.name = "Error";
      this.stack = "Error\n    UNPARSEABLE\n    STILL_UNPARSEABLE\n";
    };
    FakeError.prototype = Object.create(OriginalError.prototype);
    FakeError.prototype.constructor = FakeError;
    (global as any).Error = FakeError;

    let Q: any;
    let loadError: unknown = null;

    jest.isolateModules(() => {
      try {
        Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
      } catch (e) {
        loadError = e;
      }
    });

    global.Error = OriginalError;

    // Original: if (!fileNameAndLineNumber) { return; } → no crash → loadError is null
    // Mutated:  if (!fileNameAndLineNumber) {}           → accesses null[0] → TypeError
    expect(loadError).toBeNull();
    expect(typeof Q).toBe("function");
  });
});