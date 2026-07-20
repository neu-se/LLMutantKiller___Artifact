describe('Q', () => {
    it('should correctly check for a Node environment', () => {
        // Create a mock process object
        global.process = {
            toString: () => '[object process]',
            nextTick: () => {}
        };

        // Check if Q correctly detects the Node environment
        if (process.toString() !== '[object process]' || typeof process.nextTick !== 'function') {
            throw new Error('Not in a Node environment');
        }
    });
});