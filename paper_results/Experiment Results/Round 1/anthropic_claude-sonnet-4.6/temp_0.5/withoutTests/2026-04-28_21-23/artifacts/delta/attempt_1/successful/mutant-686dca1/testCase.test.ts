import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta module export", () => {
  it("should export Delta as a usable constructor that can create instances and perform operations", () => {
    // Verify Delta is properly exported and is a constructor
    expect(typeof Delta).toBe("function");
    
    // Create a Delta instance to verify it works
    const delta = new Delta([{ insert: "Hello" }]);
    expect(delta).toBeInstanceOf(Delta);
    
    // Verify basic operations work
    const composed = new Delta().insert("Hello").insert(" World");
    expect(composed.ops).toEqual([{ insert: "Hello World" }]);
    
    // Verify the module.exports assignment works by checking that
    // requiring the module gives back the Delta constructor
    // In Node.js (CommonJS), module.exports should be set to Delta
    const required = require("../../../../../../../../../../../subject_repositories/delta/src/Delta.ts");
    
    // In the original code: module.exports = Delta, so required should be Delta
    // In the mutated code: module.exports is NOT set (condition inverted), 
    // so required would be the module's default export object, not Delta itself
    expect(typeof required).toBe("function");
    expect(required.name).toBe("Delta");
    
    // Verify we can create an instance using the required version
    const instance = new required([{ insert: "test" }]);
    expect(instance).toBeInstanceOf(Delta);
    expect(instance.ops).toEqual([{ insert: "test" }]);
  });
});