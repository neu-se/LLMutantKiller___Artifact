import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should return an empty delta when comparing two identical deltas', () => {
    const delta1 = new Delta([{ insert: 'Hello, World!' }]);
    const delta2 = new Delta([{ insert: 'Hello, World!' }]);
    const result = delta1.diff(delta2);
    expect(result).toEqual(new Delta());
  });
});