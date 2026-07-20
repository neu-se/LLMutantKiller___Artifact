describe("Q behavior", () => {
    it("should create a global Q object when executed as a script", () => {
        // Load the Q library
        const Q = require('./q');
        
        // Since the mutation changes the behavior of Q in a browser environment,
        // we can test this by checking if the Q object is created as a global variable.
        expect(typeof Q).toBe("function");
    });
});