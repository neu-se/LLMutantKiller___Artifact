import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should not export Q when used in a non-CommonJS environment", () => {
    // Create a mock environment where typeof exports === "object" but typeof module !== "object"
    const originalExports = global.exports;
    const originalModule = global.module;
    global.exports = {};
    global.module = undefined;

    const originalQ = global.Q;
    global.Q = undefined;

    Q();

    expect(global.Q).toBeUndefined();

    // Restore the original environment
    global.exports = originalExports;
    global.module = originalModule;
    global.Q = originalQ;
  });
});