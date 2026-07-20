import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert() with object retain', () => {
  it('should handle object retain correctly', () => {
    const base = new Delta().insert({ embed: 1 });
    const delta = new Delta().retain({ embed: 2 }, { bold: true });

    const inverted = delta.invert(base);
    const expected = new Delta().retain({ embed: 1 }, { bold: null });

    expect(inverted).toEqual(expected);
  });
});