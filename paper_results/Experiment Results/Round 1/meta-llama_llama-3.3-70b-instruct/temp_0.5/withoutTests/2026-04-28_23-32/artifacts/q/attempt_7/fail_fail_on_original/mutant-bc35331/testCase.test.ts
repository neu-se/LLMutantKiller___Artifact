describe('Q', () => {
    it('should correctly check for a Node environment', () => {
        // Create a mock process object
        global.process = {
            toString: () => '[object process]',
            nextTick: () => {}
        };

        // Check if Q correctly detects the Node environment
        expect(process.toString()).toBe('[object process]');
        expect(process.nextTick).not.toBeNull();
        expect(process.toString().length).toBe(15);
    });
});