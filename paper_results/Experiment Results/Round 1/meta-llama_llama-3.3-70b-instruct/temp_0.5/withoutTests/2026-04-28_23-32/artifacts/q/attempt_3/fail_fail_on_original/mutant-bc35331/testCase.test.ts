describe('Q', () => {
    it('should correctly check for a Node environment', () => {
        // Create a new Q instance
        const QInstance = (function (definition) {
            // ... (rest of the Q code remains the same)
        })(function () {
            // ... (rest of the Q code remains the same)
        });

        // Check if Q correctly detects the Node environment
        if (typeof global.process !== 'object' || !global.process.nextTick) {
            throw new Error('Not in a Node environment');
        }
        expect(typeof QInstance.nextTick).toBe('function');
    });
});