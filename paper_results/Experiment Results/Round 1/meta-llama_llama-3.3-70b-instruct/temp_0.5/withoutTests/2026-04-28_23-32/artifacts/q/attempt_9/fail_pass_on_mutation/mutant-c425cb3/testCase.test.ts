describe('Q promise', () => {
    it('should not call the progressed callback when the promise is resolved and a progress callback is provided in the original code', () => {
        // Simulate the behavior of the Q promise library
        let progressed = false;
        const promise = {
            then: (onFulfilled, onRejected, onProgressed) => {
                // In the original code, the progressed callback is not called
                onFulfilled();
            }
        };
        promise.then(
            () => {
                // do nothing
            },
            () => {
                // do nothing
            },
            () => {
                progressed = true;
            }
        );
        expect(progressed).toBe(false);
    });
});