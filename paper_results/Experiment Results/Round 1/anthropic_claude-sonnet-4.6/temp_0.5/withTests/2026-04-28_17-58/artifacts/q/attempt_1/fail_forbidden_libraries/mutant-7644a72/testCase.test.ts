import { jest } from "@jest/globals";

describe("QReturnValue initialization", () => {
  it("should use global ReturnValue if defined when module is loaded", () => {
    // Set up a global ReturnValue before loading the module
    function CustomReturnValue(this: any, value: any) {
      this.value = value;
    }
    (global as any).ReturnValue = CustomReturnValue;

    // Clear module cache to force re-evaluation
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[modulePath];

    let Q: any;
    try {
      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      delete (global as any).ReturnValue;
      // Restore original module
      delete require.cache[modulePath];
    }

    let thrownValue: any = null;
    try {
      Q["return"](42);
    } catch (e) {
      thrownValue = e;
    }

    expect(thrownValue).not.toBeNull();
    expect(thrownValue instanceof CustomReturnValue).toBe(true);
    expect(thrownValue.value).toBe(42);
  });
});