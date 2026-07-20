describe('Q promise', () => {
    it('should call progressed callback when promise is resolved', () => {
        const Q = require('../../../../../../../../subject_repositories/q/q').Q;
        const promise = Q.resolve(1);
        let progressedValue: any;
        promise.progress((value: any) => {
            progressedValue = value;
        });
        expect(progressedValue).toBeUndefined();
        // Introduce a small delay to allow the progress callback to be called
        setTimeout(() => {
            expect(progressedValue).toBe(1);
        }, 10);
    });
});