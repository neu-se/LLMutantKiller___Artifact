import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta compose", () => {
  it("preserves null attributes on inserts from this when other starts with plain retain", () => {
    // When 'this' has an insert with null attributes and 'other' starts with a plain retain,
    // the compose should preserve the null attributes (used to remove formatting)
    const a = new Delta().insert("Hello", { bold: null });
    const b = new Delta().retain(5);
    const result = a.compose(b);
    // Original: optimization moves insert directly, preserving null attributes
    // Mutated: main loop uses AttributeMap.compose with keepNull=false, dropping null attributes
    expect(result.ops).toEqual([{ insert: "Hello", attributes: { bold: null } }]);
  });
});