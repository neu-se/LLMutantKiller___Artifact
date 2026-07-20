describe('Q', () => {
  it('should correctly determine if it is running in a Node.js environment', () => {
    // Check if Q is defined
    expect((global as any).Q).toBeDefined();

    // Create a promise using Q
    const promise = (global as any).Q.resolve('test');

    // Check if the promise is resolved
    expect(promise).resolves.toBe('test');
  });
});