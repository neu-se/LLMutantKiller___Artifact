describe("hasStacks mutation detection", () => {
  it("detects hasStacks via controlled captureLine behavior", () => {
    const OriginalError = global.Error;
    jest.resetModules();

    let callCount = 0;
    const FakeError: any = function(this: any, msg?: string) {
      this.message = msg || "";
      callCount++;
      const count = callCount;
      Object.defineProperty(this, "stack", {
        get() {
          if (count === 1) {
            // hasStacks detection: return truthy so hasStacks=true
            return "Error\n    at Object.<anonymous> (fakefile.js:1:1)";
          }
          // captureLine calls: return stack with specific format
          return "Error\n    at Object.<anonymous> (fakefile.js:5:1)\n    at captureLine (q.js:100:1)";
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