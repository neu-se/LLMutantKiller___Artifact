import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta invert", () => {
  it("should correctly invert delete followed by retain with attributes", () => {
    // delete 1 char, then retain 1 char with attributes
    // With mutation: baseIndex not returned correctly from first branch?
    // No - return is still there...
    // Let me test delete followed by object retain
    Delta.registerEmbed("image", {
      compose: (_a: unknown, b: unknown, _keepNull: boolean) => b,
      invert: (_a: unknown, b: unknown) => b,
      transform: (_a: unknown, b: unknown, _priority: boolean) => b,
    });

    const base = new Delta().insert("a").insert({ image: "original" });
    const change = new Delta().delete(1).retain({ image: "new" });
    const inverted = change.invert(base);
    
    expect(inverted.ops).toEqual([
      { insert: "a" },
      { retain: { image: "original" } },
    ]);

    Delta.unregisterEmbed("image");
  });
});