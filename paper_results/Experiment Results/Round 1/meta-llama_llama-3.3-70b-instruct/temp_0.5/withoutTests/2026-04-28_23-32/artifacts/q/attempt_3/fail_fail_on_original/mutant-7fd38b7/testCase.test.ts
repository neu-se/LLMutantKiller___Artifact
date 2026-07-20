describe('Q', () => {
    it('should reset unhandled rejections tracking correctly', () => {
        const originalQ = Q;
        Q.stopUnhandledRejectionTracking();
        Q.resetUnhandledRejections();
        expect(Q.getUnhandledReasons()).toEqual([]);
        Q.resetUnhandledRejections();
        expect(Q.getUnhandledReasons()).toEqual([]);
        Q.stopUnhandledRejectionTracking();
        Q.resetUnhandledRejections();
        expect(trackUnhandledRejections).toBe(true);
    });
});