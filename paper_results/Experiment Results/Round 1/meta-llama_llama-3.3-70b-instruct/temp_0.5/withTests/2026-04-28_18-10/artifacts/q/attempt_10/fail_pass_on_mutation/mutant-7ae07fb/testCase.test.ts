describe("Q.Promise", () => {
    it("should throw an error with a message when resolver is not a function", () => {
        const Q = {
            Promise: function(resolver) {
                if (typeof resolver !== 'function') {
                    throw new TypeError("resolver must be a function.");
                }
            }
        };
        const error = new TypeError("resolver must be a function.");
        try {
            Q.Promise(null);
        } catch (e) {
            expect(e.message).toBe(error.message);
        }
    });
});