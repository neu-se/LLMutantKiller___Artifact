import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should be able to create a new Delta instance and use its methods', () => {
    const delta = new Delta();
    expect(delta).toBeInstanceOf(Object);
    expect(typeof delta.insert).toBe('function');
    expect(typeof delta.delete).toBe('function');
    expect(typeof delta.retain).toBe('function');
  });
});