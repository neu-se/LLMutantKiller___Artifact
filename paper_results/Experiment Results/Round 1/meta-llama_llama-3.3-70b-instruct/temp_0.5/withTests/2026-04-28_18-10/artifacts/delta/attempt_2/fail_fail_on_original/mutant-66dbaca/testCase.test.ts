import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should export Delta as a module', () => {
    expect(typeof module.exports).toBe('object');
    expect(module.exports).toHaveProperty('default');
    expect(module.exports.default).toBe(Delta);
  });
});