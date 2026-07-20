import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta with object retain', () => {
  it('slice correctly handles object retain op', () => {
    const delta = new Delta().retain({ figure: true }).insert('hello');
    const sliced = delta.slice(1, 3);
    const expected = new Delta().insert('he');
    expect(sliced).toEqual(expected);
  });
});