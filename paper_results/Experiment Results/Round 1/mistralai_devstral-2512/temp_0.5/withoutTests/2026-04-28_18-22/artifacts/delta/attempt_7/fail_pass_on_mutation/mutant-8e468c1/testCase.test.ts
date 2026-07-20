import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('should correctly handle initial retain when composing with insert followed by delete', () => {
    const delta1 = new Delta().insert('test');
    const delta2 = new Delta().retain(2).delete(2);
    const result = delta1.compose(delta2);
    const expected = new Delta().insert('te');
    expect(result.ops).toEqual(expected.ops);
  });
});