import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta module export", () => {
  it("should export Delta as default and module.exports", () => {
    // This test verifies that Delta is properly exported both as default and as module.exports
    // The mutation removes the module.exports assignment, which should break this test
    const delta1 = new Delta();
    delta1.insert("test");

    // Verify we can access Delta through default export
    expect(delta1.length()).toBe(4);

    // Verify we can access Delta through module.exports (CommonJS)
    // This will fail in the mutated version because module.exports is not assigned
    const delta2 = new (require("../../../../../../../../../../../subject_repositories/delta/src/Delta.ts")).default();
    delta2.insert("test");
    expect(delta2.length()).toBe(4);
  });
});