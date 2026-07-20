import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta module export', () => {
  it('should export Delta class', () => {
    const delta = new Delta();
    expect(delta).toBeInstanceOf(Delta);
    expect(typeof delta.insert).toBe('function');
    expect(typeof delta.delete).toBe('function');
    expect(typeof delta.retain).toBe('function');
  });
});