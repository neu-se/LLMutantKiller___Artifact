import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose', () => {
  it('retain start optimization stops at non-insert ops', () => {
    const a = new Delta().insert('AB').retain(3);
    const b = new Delta().retain(4).insert('X');
    // Original: only insert('AB') consumed in opt loop, retain(3) processed normally
    // insert('X') gets inserted after 'AB' in the retain region
    const result = a.compose(b);
    const expected = new Delta().insert('AB').insert('X').retain(1);
    expect(result).toEqual(expected);
  });
});