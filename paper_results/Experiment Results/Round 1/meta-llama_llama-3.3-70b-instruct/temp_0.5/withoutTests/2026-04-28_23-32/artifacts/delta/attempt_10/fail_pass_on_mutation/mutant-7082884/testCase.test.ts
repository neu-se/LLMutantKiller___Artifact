import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should return an empty delta when comparing two identical deltas', () => {
    const delta1 = new Delta([{ insert: 'Hello, World!' }]);
    const delta2 = new Delta([{ insert: 'Hello, World!' }]);
    const result = delta1.diff(delta2);
    expect(result.ops).toEqual([]);
    const result2 = delta1.diff(delta1);
    expect(result2.ops).toEqual([]);
    const result3 = delta2.diff(delta2);
    expect(result3.ops).toEqual([]);
    const result4 = delta1.diff(delta2);
    expect(result4.ops).toEqual([]);
    const result5 = delta2.diff(delta1);
    expect(result5.ops).toEqual([]);
    const result6 = delta1.diff(delta1);
    expect(result6.ops).toEqual([]);
    expect(result6).toEqual(new Delta());
    expect(delta1.diff(delta1).ops).toEqual([]);
    expect(delta2.diff(delta2).ops).toEqual([]);
    expect(delta1.diff(delta2).ops).toEqual([]);
    expect(delta2.diff(delta1).ops).toEqual([]);
    expect(() => {
      const delta3 = new Delta([{ insert: 'Hello, World!' }]);
      const delta4 = new Delta([{ insert: 'Hello, World!' }]);
      const result7 = delta3.diff(delta4);
      expect(result7.ops).toEqual([]);
      expect(result7).toEqual(new Delta());
    }).not.toThrow();
  });
});