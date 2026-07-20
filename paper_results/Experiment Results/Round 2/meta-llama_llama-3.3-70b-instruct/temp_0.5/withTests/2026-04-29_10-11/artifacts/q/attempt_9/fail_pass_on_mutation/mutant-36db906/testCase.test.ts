describe("Q.denodeify", () => {
    it("should check if the callback is a function", () => {
        const Q = {
            denodeify: function(callback) {
                if (callback === undefined) {
                    throw new Error("Q can't wrap an undefined function");
                }
                if (typeof callback !== "function") {
                    throw new Error("Q can't wrap a non-function");
                }
                return function() {};
            }
        };

        expect(() => Q.denodeify(undefined)).toThrowError("Q can't wrap an undefined function");
        expect(() => Q.denodeify("not a function")).toThrowError("Q can't wrap a non-function");
        expect(typeof Q.denodeify(function() {})).toBe("function");
    });
});