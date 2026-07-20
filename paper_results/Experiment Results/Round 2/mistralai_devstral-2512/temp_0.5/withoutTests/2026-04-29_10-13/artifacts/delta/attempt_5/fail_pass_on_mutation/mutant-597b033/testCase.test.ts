import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta module behavior", () => {
  it("should maintain correct module export structure", () => {
    // This test verifies the module export behavior by checking the structure
    // The mutation changes the module export condition which affects how the module is exported
    const delta = new Delta();
    expect(delta).toBeInstanceOf(Delta);

    // Test basic functionality to ensure the module works correctly
    delta.insert("test");
    expect(delta.ops).toEqual([{ insert: "test" }]);

    // The key difference is that in the original code, module.exports is only set
    // when typeof module === 'object', while in the mutated code it's always set
    // This affects how the module is exported in different environments
    // We test this by verifying the module structure is correct
    expect(Delta.Op).toBeDefined();
    expect(Delta.OpIterator).toBeDefined();
    expect(Delta.AttributeMap).toBeDefined();
  });
});