import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization', () => {
  it('correctly composes retain-only this with plain retain other', () => {
    // a has only a retain(3), b has retain(5)
    // Original: loop doesn't run (retain !== insert), main loop composes retain(3)+retain(5)=retain(3)
    // Mutated: loop copies retain(3) to ops early, then otherIter advances 3, main loop adds retain(2)
    // giving retain(3)+retain(2) which after chop still differs from retain(3)
    const a = new Delta().retain(3);
    const b = new Delta().retain(5);
    const expected = new Delta().retain(3);
    expect(a.compose(b)).toEqual(expected);
  });
});