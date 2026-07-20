describe('Q promise', () => {
    it('should call progressed callback when promise is resolved', () => {
        const Q = require('./q').Q; // assuming q.js is in the same directory as the test file
        const promise = Q(1);
        let progressedValue: any;
        promise.then(
            (value: any) => {
                progressedValue = value;
            },
            () => {},
            (value: any) => {
                throw new Error('Progress callback should not be called');
            }
        );
        expect(progressedValue).toBe(1);
    });
});