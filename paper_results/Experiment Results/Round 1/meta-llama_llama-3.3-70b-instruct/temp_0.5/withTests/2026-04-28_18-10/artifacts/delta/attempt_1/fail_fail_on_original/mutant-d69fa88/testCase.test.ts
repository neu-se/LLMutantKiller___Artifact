import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should correctly handle the mutation in the invert method', () => {
    const delta = new Delta().retain({ embed: 1 });
    const base = new Delta().insert({ embed: 1 });
    const expected = new Delta().retain({ embed: 1 }, { embed: null });
    const inverted = delta.invert(base);
    expect(inverted.ops).toEqual(expected.ops);
  });
});