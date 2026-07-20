import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta module export verification', () => {
  it('should have Delta available as default and named export', () => {
    // Test that we can import Delta as default
    expect(Delta).toBeDefined();
    expect(typeof Delta).toBe('function');

    // Test that we can create an instance
    const instance = new Delta();
    expect(instance).toBeInstanceOf(Delta);

    // Test that the class has expected static properties
    expect(Delta.Op).toBeDefined();
    expect(Delta.OpIterator).toBeDefined();
    expect(Delta.AttributeMap).toBeDefined();

    // Test that the instance has expected methods
    expect(typeof instance.insert).toBe('function');
    expect(typeof instance.delete).toBe('function');
    expect(typeof instance.retain).toBe('function');
  });
});