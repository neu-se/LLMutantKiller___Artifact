import Delta from "../../src/Delta";

describe("Delta module export", () => {
  it("should be importable as a CommonJS module and function correctly as a constructor", () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const DeltaRequired = require("../../src/Delta");
    
    // In the original code, module.exports = Delta is executed because typeof module === 'object'
    // In the mutated code, typeof module === "" is always false, so module.exports is never set
    // This means the required module won't have the Delta constructor properly exported
    
    // The default export should be the Delta class itself
    const DeltaClass = DeltaRequired.default || DeltaRequired;
    
    // Verify we can create an instance and it behaves correctly
    const delta = new DeltaClass();
    expect(delta).toBeDefined();
    expect(delta.ops).toBeDefined();
    expect(Array.isArray(delta.ops)).toBe(true);
    expect(delta.ops.length).toBe(0);
    
    // Verify basic operations work - this confirms we have the real Delta class
    const result = new DeltaClass().insert("hello").insert(" world");
    expect(result.ops.length).toBe(1);
    expect(result.ops[0]).toEqual({ insert: "hello world" });
    
    // Verify that module.exports.default === module.exports (set by the original code)
    // In the original: module.exports = Delta AND module.exports.default = Delta
    // In the mutated code: neither assignment happens
    expect(DeltaRequired.default).toBeDefined();
    expect(typeof DeltaRequired.default).toBe("function");
    
    // The key assertion: module.exports.default should equal module.exports
    // (as set by `module.exports.default = Delta` after `module.exports = Delta`)
    expect(DeltaRequired.default).toBe(DeltaRequired);
  });
});