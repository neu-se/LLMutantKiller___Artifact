describe("captureLine", () => {
  it("does not crash on module load when Error has no stack", () => {
    const RealError = global.Error;

    const MockError: any = function MockError(this: any, msg?: string) {
      this.message = msg || "";
      // no stack property - simulates environments without stack traces
    };
    MockError.prototype = Object.create(RealError.prototype);
    MockError.prototype.constructor = MockError;
    Object.setPrototypeOf(MockError, RealError);
    (global as any).Error = MockError;

    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[qPath];

    let caught: any = null;
    try {
      require(qPath);
    } catch (e) {
      caught = e;
    } finally {
      (global as any).Error = RealError;
      delete require.cache[qPath];
    }

    expect(caught).toBeNull();
  });
});