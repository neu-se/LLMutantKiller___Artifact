import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should return an empty delta when comparing two identical deltas', () => {
    const delta1 = new Delta([{ insert: 'Hello, World!' }]);
    const delta2 = new Delta([{ insert: 'Hello, World!' }]);
    const result = delta1.diff(delta2);
    expect(result.ops).toEqual([]);
    const delta3 = new Delta([{ insert: 'Hello, World!' }]);
    expect(delta1.diff(delta3).ops).toEqual([]);
    const delta4 = new Delta([{ insert: 'Hello, World!' }]);
    expect(delta2.diff(delta4).ops).toEqual([]);
    const delta5 = new Delta([{ insert: 'Hello, World!' }]);
    expect(delta3.diff(delta5).ops).toEqual([]);
  });
});