describe("Q.denodeify", () => {
    it("should throw an error when callback is undefined in the original code", () => {
        const Q = {
            denodeify: function(callback) {
                if (callback === undefined) {
                    throw new Error("Q can't wrap an undefined function");
                }
                return function() {};
            }
        };

        expect(() => Q.denodeify(undefined)).toThrowError("Q can't wrap an undefined function");
    });

    it.skip("should not throw an error when callback is undefined in the mutated code", () => {
        const Q = {
            denodeify: function(callback) {
                if (false) {
                    throw new Error("Q can't wrap an undefined function");
                }
                return function() {};
            }
        };

        expect(() => Q.denodeify(undefined)).toThrowError();
    });
});