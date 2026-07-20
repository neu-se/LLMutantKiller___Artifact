describe("hasStacks mutation detection", () => {
  it("hasStacks initial value preserved when Error.stack getter throws during Q module init", () => {
    const OriginalError = global.Error;
    jest.resetModules();

    const FakeError: any = function(this: any, msg?: string) {
      this.message = msg || "";
      Object.defineProperty(this, "stack", {
        get() { throw new OriginalError("no stack"); },
        configurable: true,
      });
    };
    FakeError.prototype = Object.create(OriginalError.prototype);
    FakeError.prototype.constructor = FakeError;

    global.Error = FakeError;
    let loadError: Error | null = null;
    try {
      require("../../../../../../../../../../../subject_repositories/q/q.js");
    } catch(e: any) {
      loadError = e;
    } finally {
      global.Error = OriginalError;
      jest.resetModules();
    }

    // Original: hasStacks stays false -> captureLine returns early -> no crash
    // Mutation: hasStacks stays true -> captureLine tries e.stack.split() -> crashes
    expect(loadError).toBeNull();
  });
});