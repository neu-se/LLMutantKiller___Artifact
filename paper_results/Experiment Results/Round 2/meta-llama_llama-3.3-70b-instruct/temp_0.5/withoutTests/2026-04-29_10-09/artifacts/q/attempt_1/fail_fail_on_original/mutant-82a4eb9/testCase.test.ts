import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should throw an error when used in an unsupported environment", () => {
    // Create a mock environment where typeof exports === "object" but typeof module !== "object"
    const originalExports = global.exports;
    const originalModule = global.module;
    global.exports = {};
    global.module = undefined;

    expect(() => Q()).toThrowError("This environment was not anticipated by Q. Please file a bug.");

    // Restore the original environment
    global.exports = originalExports;
    global.module = originalModule;
  });
});