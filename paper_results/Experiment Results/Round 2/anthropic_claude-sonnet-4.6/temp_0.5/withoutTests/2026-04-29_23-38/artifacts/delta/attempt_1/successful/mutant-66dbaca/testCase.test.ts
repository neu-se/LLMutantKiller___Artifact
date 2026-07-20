import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta CommonJS module exports", () => {
  it("should be accessible via require() as both default and named export", () => {
    // Use require to test CommonJS exports
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const required = require("../../../../../../../../../../../subject_repositories/delta/src/Delta.ts");
    
    // In the original code, module.exports = Delta, so require() should return Delta directly
    // The Delta class has a specific structure we can verify
    const DeltaClass = required.default !== undefined ? required.default : required;
    
    // Create an instance to verify it's the Delta class
    const delta = new DeltaClass([{ insert: "hello" }]);
    expect(delta.ops).toEqual([{ insert: "hello" }]);
    expect(delta.length()).toBe(5);
    
    // Verify module.exports.default is also Delta (set in original code)
    // In original: module.exports = Delta; module.exports.default = Delta;
    // In mutated: neither is set, so require().default would be undefined or the ES module default
    expect(required.default).toBeDefined();
    expect(typeof required.default).toBe("function");
    
    // Verify that required.default is the Delta constructor by instantiating it
    const delta2 = new required.default([{ insert: "world" }]);
    expect(delta2.ops).toEqual([{ insert: "world" }]);
    expect(delta2.length()).toBe(5);
    
    // The original sets module.exports = Delta (the class itself)
    // So require() should return a function (the class)
    // In the mutated version, module.exports is NOT set to Delta,
    // so require() would return the module object without Delta as the export
    expect(typeof required).toBe("function");
  });
});