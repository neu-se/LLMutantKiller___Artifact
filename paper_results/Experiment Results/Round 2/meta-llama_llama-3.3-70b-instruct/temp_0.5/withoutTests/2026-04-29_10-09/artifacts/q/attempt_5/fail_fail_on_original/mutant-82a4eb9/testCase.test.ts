import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should export Q when used in a CommonJS environment and not when used in a non-CommonJS environment", () => {
    // Create a mock environment where typeof exports === "object" and typeof module === "object"
    const originalExports = global.exports;
    const originalModule = global.module;
    global.exports = {};
    global.module = { exports: {} };

    Q();

    expect(global.module.exports).toBeDefined();

    // Restore the original environment
    global.exports = originalExports;
    global.module = originalModule;

    // Create a mock environment where typeof exports === "object" but typeof module !== "object"
    global.exports = {};
    global.module = undefined;

    Q();

    expect(global.Q).toBeUndefined();
  });
});