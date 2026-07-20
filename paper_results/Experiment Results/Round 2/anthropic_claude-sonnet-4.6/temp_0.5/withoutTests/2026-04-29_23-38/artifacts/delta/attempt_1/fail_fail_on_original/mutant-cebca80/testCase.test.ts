import Delta from "../../../../../../subject_repositories/delta/src/Delta";

describe('Delta invert', () => {
  it('should correctly invert a retain with attributes', () => {
    const base = new Delta().insert('Hello');
    const delta = new Delta().retain(5, { bold: true });
    const inverted = delta.invert(base);
    // The inverted delta should retain 5 with the inverted attributes (removing bold)
    // Original: retain with number -> forEach checks object retain (false) -> no retain added in forEach
    // But the retain IS added via the outer else if branch for object retains
    // With mutation: forEach always executes retain, adding extra operations
    expect(inverted).toEqual(new Delta().retain(5, { bold: null }));
  });
});