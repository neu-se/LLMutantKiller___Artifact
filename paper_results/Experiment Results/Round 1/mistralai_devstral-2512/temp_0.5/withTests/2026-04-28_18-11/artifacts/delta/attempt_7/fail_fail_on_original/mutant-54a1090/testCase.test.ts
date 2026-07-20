import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should optimize when first other op is retain without attributes and length is less than this length', () => {
    const a = new Delta().insert('ABC').retain(3);
    const b = new Delta().retain(2).insert('D');
    const expected = new Delta().insert('ABC').retain(2).insert('D').retain(1);
    expect(a.compose(b)).toEqual(expected);
  });
});