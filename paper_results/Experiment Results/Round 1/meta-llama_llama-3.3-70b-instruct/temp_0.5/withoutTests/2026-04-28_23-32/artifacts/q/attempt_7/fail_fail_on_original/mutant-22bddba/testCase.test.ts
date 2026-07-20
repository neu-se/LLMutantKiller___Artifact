describe('Q', () => {
    it('should create a global Q object when executed as a script', () => {
        // Load the Q library
        eval(`
            (function (definition) {
                //... (rest of the Q function remains the same)
            })(function () {
                //... (rest of the Q function remains the same)
            });
        `);

        // Check if the Q object is created on the global object
        expect((global as any).Q).toBeDefined();
        expect(typeof (global as any).Q).toBe('function');
    });
});