import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta CommonJS exports", () => {
  it("should export Delta directly as module.exports for CommonJS compatibility", () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const required = require("../../../../../../../../../../../subject_repositories/delta/src/Delta.ts");
    
    // Original code: module.exports = Delta, so required === Delta (the class itself)
    // Mutated code: module.exports is not set to Delta, so required is the ES namespace object
    // In original, required.default should be Delta (set explicitly)
    // In mutated, required.default would be Delta from ES module interop but required itself is not Delta
    
    // Test that required is the Delta class itself (callable as constructor without .default)
    expect(typeof required).toBe('function');
    const instance = new required();
    expect(instance).toBeInstanceOf(Delta);
    expect(instance.ops).toEqual([]);
  });
});