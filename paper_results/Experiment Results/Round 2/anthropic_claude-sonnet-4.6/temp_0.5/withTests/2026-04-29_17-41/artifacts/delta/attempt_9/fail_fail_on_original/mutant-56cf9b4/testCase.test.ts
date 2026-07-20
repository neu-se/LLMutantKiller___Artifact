import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff()', () => {
  it('correctly diffs when inserted content is at start and shares suffix with original', () => {
    const a = new Delta().insert('a');
    const b = new Delta().insert('ba');
    const expected = new Delta().insert('b').retain(1);
    expect(a.diff(b)).toEqual(expected);
  });
});