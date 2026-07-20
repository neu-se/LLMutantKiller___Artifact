import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta module export", () => {
  it("should export Delta as a usable constructor via module.exports", () => {
    // The mutation changes `if (typeof module === 'object')` to `if (false)`,
    // which prevents `module.exports = Delta` from being executed.
    // This means the CommonJS require() would not get the Delta class.
    // We verify that the module is properly exported by using require() directly.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const required = require("../../../../../../../../../../../subject_repositories/delta/src/Delta.ts");
    
    // In the original code, module.exports = Delta is executed, so require() returns Delta directly
    // In the mutated code, module.exports = Delta is NOT executed, so require() returns the module's
    // default export object (ES module interop), not the Delta constructor directly
    
    // The original code sets module.exports = Delta AND module.exports.default = Delta
    // So required should be the Delta constructor itself (callable as a class)
    expect(typeof required).toBe('function');
    
    // It should be constructable and produce a working Delta instance
    const instance = new required();
    expect(instance).toBeInstanceOf(Delta);
    expect(Array.isArray(instance.ops)).toBe(true);
    
    // Verify it's the actual Delta class (not just any function)
    const delta = new required([{ insert: 'hello' }]);
    expect(delta.ops).toEqual([{ insert: 'hello' }]);
    expect(delta.length()).toBe(5);
  });
});