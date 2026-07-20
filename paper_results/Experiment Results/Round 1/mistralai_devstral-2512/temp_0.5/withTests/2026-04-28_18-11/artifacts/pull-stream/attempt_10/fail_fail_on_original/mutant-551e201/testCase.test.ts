const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");

describe("drain error handling", () => {
  it("should throw error when end is not true and no done callback", () => {
    const error = new Error("test error");
    const sink = drain(null, undefined);

    // Capture console.warn to verify the warning is shown
    const originalWarn = console.warn;
    let warnCalled = false;
    console.warn = (msg) => {
      warnCalled = true;
      originalWarn(msg);
    };

    let hasThrown = false;
    try {
      // Directly call the sink with an error
      sink(error, () => {});
    } catch (e) {
      hasThrown = true;
    }

    console.warn = originalWarn;
    expect(hasThrown).toBe(true);
    expect(warnCalled).toBe(true);
  });
});