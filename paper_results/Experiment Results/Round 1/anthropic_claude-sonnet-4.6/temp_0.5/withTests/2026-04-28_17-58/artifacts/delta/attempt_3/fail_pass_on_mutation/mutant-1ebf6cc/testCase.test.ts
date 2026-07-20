import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Op.length() with object retain', () => {
  it('correctly computes length of a delta containing an object retain', () => {
    const delta = new Delta().retain({ figure: true });
    // Op.length for an object retain should return 1
    // The delta length should be 1
    expect(delta.length()).toEqual(1);
  });
});