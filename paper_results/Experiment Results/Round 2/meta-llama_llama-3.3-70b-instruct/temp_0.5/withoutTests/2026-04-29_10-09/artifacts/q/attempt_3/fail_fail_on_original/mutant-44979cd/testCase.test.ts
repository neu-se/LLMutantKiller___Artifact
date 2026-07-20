describe("Q", () => {
  it("should export Q when used as a CommonJS module", () => {
    const originalModuleExports = module.exports;
    const q = require("../q.js");
    expect(typeof q).toBe("function");
    module.exports = originalModuleExports;
  });
});