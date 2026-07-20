describe("Q.Promise", () => {
    it("should throw an error when resolver is not a function", () => {
        const Q = {
            Promise: function(resolver) {
                if (typeof resolver !== 'function') {
                    throw new TypeError("resolver must be a function.");
                }
            }
        };
        expect(() => Q.Promise(null)).toThrowError("resolver must be a function.");
    });
});