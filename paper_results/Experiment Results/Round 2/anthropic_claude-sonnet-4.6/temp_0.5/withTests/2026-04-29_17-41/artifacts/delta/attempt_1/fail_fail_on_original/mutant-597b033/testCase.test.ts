import Delta from "../../src/Delta";

describe("Delta module export", () => {
  it("should export Delta as default with correct constructor behavior", () => {
    // Verify the default export is the Delta constructor
    expect(typeof Delta).toBe("function");
    
    // Verify that Delta instances work correctly
    const delta = new Delta().insert("Hello").retain(5).delete(3);
    expect(delta.ops).toEqual([
      { insert: "Hello" },
      { retain: 5 },
      { delete: 3 },
    ]);
    
    // Verify that the module.exports.default assignment doesn't break the default import
    // In the mutated code, if module is not defined (non-Node env), this would throw
    // In Node.js, both conditions evaluate the same way, so we verify the export shape
    const DeltaModule = require("../../src/Delta");
    
    // In original: module.exports = Delta only when typeof module === 'object'
    // In mutated: module.exports = Delta always (if(true))
    // The key difference: module.exports.default should equal the Delta class
    expect(DeltaModule).toBe(Delta);
    expect(DeltaModule.default).toBe(Delta);
  });
});