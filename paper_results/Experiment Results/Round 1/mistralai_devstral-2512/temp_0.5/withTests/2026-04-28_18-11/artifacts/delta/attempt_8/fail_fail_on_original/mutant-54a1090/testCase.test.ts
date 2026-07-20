import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should optimize when first other op is retain without attributes and length equals this length', () => {
    const a = new Delta().insert('A').retain(2);
    const b = new Delta().retain(2).insert('B');
    const expected = new Delta().insert('A').retain(2).insert('B');
    expect(a.compose(b)).toEqual(expected);
  });
});