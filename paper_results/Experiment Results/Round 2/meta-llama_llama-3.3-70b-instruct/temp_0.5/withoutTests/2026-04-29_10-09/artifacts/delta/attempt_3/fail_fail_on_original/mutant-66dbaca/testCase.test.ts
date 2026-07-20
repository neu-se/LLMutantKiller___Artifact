import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should export Delta correctly', () => {
    expect(typeof module.exports).toBe('object');
    expect(Object.keys(module.exports)).toEqual(['default', 'Op', 'OpIterator', 'AttributeMap']);
    expect(module.exports.default).toBe(Delta);
  });
});