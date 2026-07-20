describe('Q', () => {
    it('should create a global Q object when executed as a script', () => {
        // Load the Q library
        const q = require('./q');

        // Check if the Q object is created on the global object
        expect((global as any).Q).toBeDefined();
        expect(typeof (global as any).Q).toBe('function');
    });
});