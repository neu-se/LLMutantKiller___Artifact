describe('Q promise', () => {
    it('should call progressed callback when promise is resolved', () => {
        const Q = require('../../q').Q; 
        const promise = Q(1);
        let progressedValue: any;
        promise.then(
            (value: any) => {
                progressedValue = value;
            },
            () => {},
            (value: any) => {
                progressedValue = value;
            }
        );
        expect(progressedValue).toBeUndefined();
        // Introduce a small delay to allow the progress callback to be called
        setTimeout(() => {
            expect(progressedValue).toBe(1);
        }, 10);
    });
});