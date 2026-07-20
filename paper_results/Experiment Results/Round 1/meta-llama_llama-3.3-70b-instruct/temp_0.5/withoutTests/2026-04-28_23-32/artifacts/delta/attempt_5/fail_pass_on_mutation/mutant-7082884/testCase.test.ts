import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should return an empty delta when comparing two identical deltas', () => {
    const delta1 = new Delta([{ insert: 'Hello, World!' }]);
    const delta2 = new Delta([{ insert: 'Hello, World!' }]);
    const result = delta1.diff(delta2);
    expect(result.length()).toBe(0);
    expect(delta1.diff(delta1).length()).toBe(0);
    expect(delta2.diff(delta2).length()).toBe(0);
    expect(delta1.diff(delta2).length()).toBe(0);
    const delta3 = new Delta([{ insert: 'Hello, World!' }, { insert: '!' }]);
    expect(delta1.diff(delta3).length()).not.toBe(0);
  });
});