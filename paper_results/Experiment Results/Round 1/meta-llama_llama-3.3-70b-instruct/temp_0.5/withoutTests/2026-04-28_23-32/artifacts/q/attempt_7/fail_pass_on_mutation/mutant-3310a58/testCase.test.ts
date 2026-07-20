describe('Q', () => {
    it('should check the condition for enabling long stack support', () => {
        // Save the original process.env.Q_DEBUG
        const originalQDebug = process.env.Q_DEBUG;

        // Clear Q_DEBUG from process.env
        delete process.env.Q_DEBUG;

        // Define Q
        const Q = {
            longStackSupport: false,
        };

        // Enable long stack support only when process is an object and Q_DEBUG is set
        if (typeof process === 'object' && process.env && process.env.Q_DEBUG) {
            Q.longStackSupport = true;
        }

        expect(Q.longStackSupport).toBe(false);

        // Restore the original process.env.Q_DEBUG
        process.env.Q_DEBUG = originalQDebug;
    });
});