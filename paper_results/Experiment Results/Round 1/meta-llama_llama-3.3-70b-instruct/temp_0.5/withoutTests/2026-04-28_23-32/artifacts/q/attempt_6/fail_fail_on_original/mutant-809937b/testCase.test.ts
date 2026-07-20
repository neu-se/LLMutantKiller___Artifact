describe('Q', () => {
    it('should correctly handle unhandled rejections', () => {
        const Q = require('../../../../../../../../subject_repositories/q/q');
        const promise = Q.reject('Test rejection');
        const originalEmit = process.emit;
        let emitted = false;
        process.emit = (event: string, ...args: any[]) => {
            if (event === 'unhandledRejection') {
                emitted = true;
            }
            return (originalEmit as any)(event, ...args);
        };
        Q.untrackRejection(promise);
        expect(emitted).toBe(true);
        process.emit = originalEmit;
    });
});