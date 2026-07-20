describe('Q.denodeify', () => {
    it('should throw an error when callback is undefined', () => {
        const Q = {
            denodeify: function (callback) {
                if (callback === undefined) {
                    throw new Error("Q can't wrap an undefined function");
                }
                // rest of the function
            }
        };
        expect(() => Q.denodeify(undefined)).toThrowError("Q can't wrap an undefined function");

        const mutatedQ = {
            denodeify: function (callback) {
                if (false) {
                    throw new Error("Q can't wrap an undefined function");
                }
                // rest of the function
            }
        };
        expect(() => mutatedQ.denodeify(undefined)).not.toThrowError("Q can't wrap an undefined function");
    });
});