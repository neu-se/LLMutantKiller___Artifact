import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('slice produces correct result requiring push at end of ops', () => {
    const delta = new Delta().insert('abc').retain(2);
    const sliced = delta.slice(0, 3);
    expect(sliced.ops).toEqual([{ insert: 'abc' }]);
  });
});