import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization', () => {
  it('correctly composes when other starts with a retain larger than the leading inserts in this', () => {
    // The optimization pre-processes leading inserts from `this` when `other` starts
    // with a plain retain, advancing otherIter past the consumed portion.
    // Without it (mutation), the full retain remains and interacts with subsequent
    // retain ops in `this`, producing a different result.
    const a = new Delta()
      .insert('AB')
      .retain(3);
    const b = new Delta().retain(5);
    const expected = new Delta().insert('AB').retain(3);
    expect(a.compose(b)).toEqual(expected);
  });
});