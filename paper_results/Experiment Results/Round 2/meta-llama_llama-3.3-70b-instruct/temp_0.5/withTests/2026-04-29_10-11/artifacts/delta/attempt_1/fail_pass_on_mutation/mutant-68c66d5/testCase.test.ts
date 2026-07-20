import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('should export the Delta class', () => {
    expect(Delta).toBeDefined();
    expect(typeof Delta).toBe('function');
  });
});