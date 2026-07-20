import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should export Delta correctly', () => {
    expect(typeof Delta).toBe('function');
    expect(Delta.prototype.constructor).toBe(Delta);
  });
});