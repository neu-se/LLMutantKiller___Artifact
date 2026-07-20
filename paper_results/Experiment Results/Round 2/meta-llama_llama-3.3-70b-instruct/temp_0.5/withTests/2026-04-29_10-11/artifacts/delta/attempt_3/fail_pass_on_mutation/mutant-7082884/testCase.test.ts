import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should return an empty delta when diffing two identical deltas', () => {
    const delta1 = new Delta().insert('Hello, World!');
    const delta2 = new Delta().insert('Hello, World!');
    const expected = new Delta();
    expect(delta1.diff(delta2)).toEqual(expected);
    expect(delta1.diff(delta1)).toEqual(expected);
  });
});