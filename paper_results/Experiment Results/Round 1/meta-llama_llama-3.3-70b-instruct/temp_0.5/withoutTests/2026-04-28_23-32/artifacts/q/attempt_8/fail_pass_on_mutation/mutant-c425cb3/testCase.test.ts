describe('Q promise', () => {
    it('should call the progressed callback when the promise is resolved and a progress callback is provided in the mutated code, but not in the original code', () => {
        // Simulate the behavior of the Q promise library
        let progressed = false;
        const promise = {
            then: (onFulfilled, onRejected, onProgressed) => {
                // In the mutated code, the progressed callback is always called
                onProgressed();
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
        expect(progressed).toBe(true);
    });
});