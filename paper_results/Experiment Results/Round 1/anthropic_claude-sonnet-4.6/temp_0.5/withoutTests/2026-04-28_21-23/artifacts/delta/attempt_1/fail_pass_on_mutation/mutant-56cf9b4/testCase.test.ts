import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta invert with retain and attributes", () => {
  it("should correctly invert a retain op with attributes, not applying retain logic to delete ops", () => {
    // Create a base document
    const base = new Delta().insert("Hello");
    
    // Create a delta that retains with attributes (bold)
    const delta = new Delta().retain(5, { bold: true });
    
    // Invert should produce a retain that removes the bold attribute
    const inverted = delta.invert(base);
    
    // The inverted delta should retain 5 chars and set bold to null (removing it)
    expect(inverted.ops).toEqual([{ retain: 5, attributes: { bold: null } }]);
  });
});