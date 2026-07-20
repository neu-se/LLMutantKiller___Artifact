describe("hasStacks mutation detection", () => {
  it("detects hasStacks initial value via module reload with controlled Error.stack", () => {
    const OriginalError = global.Error;
    jest.resetModules();

    let accessCount = 0;
    const FakeError: any = function(this: any, msg?: string) {
      this.message = msg || "";
      const stackValue = "fake\n    at Object.<anonymous> (test.js:1:1)\n    at test.js:2:1";
      Object.defineProperty(this, "stack", {
        get() {
          accessCount++;
          // First access: return truthy (hasStacks detection) -> hasStacks=true
          // Second access (in captureLine): return value that causes no crash
          return stackValue;
        },
        configurable: true,
      });
    };
    FakeError.prototype = Object.create(OriginalError.prototype);
    FakeError.prototype.constructor = FakeError;

    global.Error = FakeError;
    let Q: any;
    try {
      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      global.Error = OriginalError;
      jest.resetModules();
    }

    Q.longStackSupport = true;
    const d = Q.defer();
    Q.longStackSupport = false;
    d.resolve(undefined);

    expect(typeof d.promise.stack).toBe("string");
  });
});