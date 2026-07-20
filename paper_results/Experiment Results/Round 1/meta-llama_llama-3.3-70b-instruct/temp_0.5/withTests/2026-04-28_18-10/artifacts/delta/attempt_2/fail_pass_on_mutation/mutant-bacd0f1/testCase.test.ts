import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta transform', () => {
  it('should handle null otherData correctly', () => {
    const delta1 = new Delta().retain(1, { test: 'value' });
    const delta2 = new Delta().retain(1, null);
    const result = delta1.transform(delta2);
    expect(result).toBeDefined();
  });
});