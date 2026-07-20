import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('should skip initial retain when composing with insert', () => {
    const delta1 = new Delta().insert('abc');
    const delta2 = new Delta().retain(2).insert('x');
    const result = delta1.compose(delta2);
    const expected = new Delta().insert('abx');
    expect(result.ops).toEqual(expected.ops);
  });
});