describe('Q', () => {
  it('should correctly determine if it is running in a Node.js environment', () => {
    // Check if process is defined
    expect(global.process).toBeDefined();

    // Check if process.toString returns '[object process]'
    expect(global.process.toString()).toBe('[object process]');

    // Check if Q.defer is a function
    expect((global as any).Q.defer).toBeInstanceOf(Function);

    // Create a deferred object using Q.defer
    const deferred = (global as any).Q.defer();

    // Check if deferred.resolve is a function
    expect(deferred.resolve).toBeInstanceOf(Function);

    // Resolve the deferred object
    deferred.resolve('test');

    // Check if deferred.promise is resolved
    expect(deferred.promise).resolves.toBe('test');
  });
});