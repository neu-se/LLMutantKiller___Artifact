describe('Q', () => {
    it('should handle setImmediate correctly', () => {
        const originalSetImmediate = global.setImmediate;
        const originalTimeout = global.setTimeout;

        // Mock setImmediate and setTimeout to track their calls
        const setImmediateMock = jest.fn();
        const setTimeoutMock = jest.fn();

        global.setImmediate = setImmediateMock;
        global.setTimeout = setTimeoutMock;

        // Create a promise that resolves immediately
        const promise = Q.resolve();

        // Wait for the promise to resolve
        promise.then(() => {
            // Check if setImmediate is called when it's a function
            if (typeof originalSetImmediate === 'function') {
                expect(setImmediateMock).toHaveBeenCalledTimes(1);
            } else {
                expect(setTimeoutMock).toHaveBeenCalledTimes(1);
            }
        });

        // Restore the original setImmediate and setTimeout
        global.setImmediate = originalSetImmediate;
        global.setTimeout = originalTimeout;
    });
});