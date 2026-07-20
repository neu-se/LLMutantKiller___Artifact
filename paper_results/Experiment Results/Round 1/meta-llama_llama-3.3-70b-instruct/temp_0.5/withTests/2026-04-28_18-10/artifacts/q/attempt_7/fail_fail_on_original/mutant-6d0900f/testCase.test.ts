describe('q', () => {
    it('should handle unhandled rejections correctly', () => {
        const Q = require('../../../../q.js');
        Q.trackUnhandledRejections = true;
        const promise = Q.reject(new Error('Test error'));
        Q.untrackRejection(promise);
        expect(Q.unhandledRejections.length).toBe(0);
        Q.trackRejection(promise, new Error('Test error'));
        expect(Q.unhandledRejections.length).toBe(1);
        Q.untrackRejection(promise);
        expect(Q.unhandledRejections.length).toBe(0);
    });
});