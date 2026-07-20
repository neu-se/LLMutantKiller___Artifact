import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta module export", () => {
  it("should be importable and functional as a constructor", () => {
    // If module.exports = Delta is not executed (mutated code),
    // the import may fail or Delta may be undefined/not a constructor
    expect(Delta).toBeDefined();
    expect(typeof Delta).toBe("function");
    
    // Verify it actually works as a constructor
    const delta = new Delta();
    expect(delta).toBeInstanceOf(Delta);
    expect(delta.ops).toEqual([]);
    
    // Verify basic operations work
    const result = new Delta().insert("hello");
    expect(result.ops).toEqual([{ insert: "hello" }]);
    
    // Verify module.exports was set correctly by checking that
    // require() returns the same Delta constructor
    // In Jest/Node.js environment, typeof module === 'object' is true
    // so the original code sets module.exports = Delta
    // The mutated code uses typeof module === "" which is always false
    // so module.exports won't be set, breaking CommonJS interop
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const DeltaRequired = require("../../../../../../../../../../../subject_repositories/delta/src/Delta.ts");
    
    // With original code: module.exports = Delta, so DeltaRequired should be Delta
    // With mutated code: module.exports is not set, so DeltaRequired.default should be Delta
    // but DeltaRequired itself (as a constructor) won't work
    const DeltaConstructor = DeltaRequired.default || DeltaRequired;
    
    const delta2 = new DeltaConstructor([{ insert: "world" }]);
    expect(delta2.ops).toEqual([{ insert: "world" }]);
    
    // The critical test: with original code, module.exports = Delta directly
    // so DeltaRequired should be callable as a constructor
    // With mutated code, module.exports is not overwritten, so DeltaRequired
    // would be the ES module object (with .default property), not Delta itself
    expect(typeof DeltaRequired).toBe("function");
    
    const delta3 = new DeltaRequired();
    expect(delta3.ops).toEqual([]);
  });
});