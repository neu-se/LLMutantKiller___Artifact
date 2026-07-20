import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose with embed objects", () => {
  it("should correctly handle retain with embed object when composing with delete", () => {
    // Setup: Register a simple embed handler
    Delta.registerEmbed("test", {
      compose: (a: any, b: any, keepNull: boolean) => b,
      invert: (a: any, b: any) => a,
      transform: (a: any, b: any, priority: boolean) => b,
    });

    // Create a delta with a retain operation containing an embed object
    const delta1 = new Delta().retain({ test: { id: 1 } }, { bold: true });

    // Create another delta with a delete operation
    const delta2 = new Delta().delete(1);

    // Compose them - the original code should handle this correctly
    const result = delta1.compose(delta2);

    // The result should contain the delete operation with attributes preserved
    expect(result.ops).toEqual([{ delete: 1 }]);

    // Clean up
    Delta.unregisterEmbed("test");
  });
});