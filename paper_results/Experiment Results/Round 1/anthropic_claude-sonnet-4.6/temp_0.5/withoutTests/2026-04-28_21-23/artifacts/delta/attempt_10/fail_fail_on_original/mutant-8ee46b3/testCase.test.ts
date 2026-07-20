import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta"

describe('Delta transform', () => {
  it('transform of a delta with mixed ops against retain with attributes', () => {
    const a = new Delta().insert('a').retain(3, { bold: true });
    const b = new Delta().retain(4, { italic: true });
    const result = a.transform(b, true);
    expect(result.ops).toEqual([
      { retain: 1 },
      { retain: 3, attributes: { italic: true } }
    ]);
  });
});