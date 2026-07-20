import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('retain + retain where this is longer than other produces correct result', () => {
    const a = new Delta().retain(5, { bold: true });
    const b = new Delta().retain(3, { italic: true });
    // Original: retain(3,{italic}) then retain(2) chopped -> retain(3,{italic})
    // Mutated: retain(3,{italic}) then retain(Inf) chopped -> retain(3,{italic})
    // Same - need different approach
    const expected = new Delta().retain(3, { italic: true });
    expect(a.transform(b, true)).toEqual(expected);
  });
});