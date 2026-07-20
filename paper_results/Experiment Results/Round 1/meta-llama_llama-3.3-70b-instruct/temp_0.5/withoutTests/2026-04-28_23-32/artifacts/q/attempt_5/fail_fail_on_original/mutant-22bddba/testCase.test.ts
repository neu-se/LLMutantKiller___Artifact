describe('Q', () => {
    it('should create a global Q object when executed as a script', () => {
        // Load the Q library
        const fs = require('fs');
        const qCode = fs.readFileSync('./q.js', 'utf8');
        eval(qCode);

        // Check if the Q object is created on the global object
        expect((global as any).Q).toBeDefined();
        expect(typeof (global as any).Q).toBe('function');
    });
});