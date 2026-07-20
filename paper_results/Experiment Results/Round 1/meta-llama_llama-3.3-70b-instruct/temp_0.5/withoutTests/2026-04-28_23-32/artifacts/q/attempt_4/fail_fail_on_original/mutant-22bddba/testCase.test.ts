describe('Q', () => {
    it('should create a global Q object when executed as a script', () => {
        // Load the Q library
        const q = require('../../../../../../../../../subject_repositories/q/q.js');

        // Check if the Q object is created on the global object
        expect((global as any).Q).toBeDefined();
    });
});