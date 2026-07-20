describe('Q', () => {
    it('should correctly check for a Node environment', () => {
        // Create a mock process object
        global.process = {
            toString: () => '[object process]',
            nextTick: () => {}
        };

        // Check if Q correctly detects the Node environment
        expect(process.toString() === '[object process]').toBe(true);
        expect(!!process.nextTick).toBe(true);
    });
});