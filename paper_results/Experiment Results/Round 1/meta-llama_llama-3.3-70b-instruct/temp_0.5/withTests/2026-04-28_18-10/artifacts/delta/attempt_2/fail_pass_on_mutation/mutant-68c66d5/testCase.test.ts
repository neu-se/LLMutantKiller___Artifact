import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly export the Delta class', () => {
    expect(Delta).toBeDefined();
    expect(typeof Delta).toBe('function');
  });
});