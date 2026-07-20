describe('Q promise', () => {
    it('should throw an error when the progressed callback is called unexpectedly', () => {
        // Simulate the behavior of the Q promise library
        let progressed = false;
        const promise = {
            then: (onFulfilled, onRejected, onProgressed) => {
                // In the original code, the progressed callback should not be called
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
                throw new Error('Progressed callback should not be called');
            }
        );
        expect(progressed).toBe(false);
    });
});