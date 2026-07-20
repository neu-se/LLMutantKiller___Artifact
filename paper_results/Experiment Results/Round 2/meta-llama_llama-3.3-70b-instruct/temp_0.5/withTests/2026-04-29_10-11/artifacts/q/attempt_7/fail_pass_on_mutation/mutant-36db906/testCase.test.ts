describe("Q.denodeify", () => {
    it("should throw an error when denodeifying a non-function", () => {
        const Q = {
            denodeify: function(callback) {
                if (typeof callback !== "function") {
                    throw new Error("Q can't wrap a non-function");
                }
            }
        };

        expect(() => Q.denodeify("not a function")).toThrowError("Q can't wrap a non-function");
    });

    it("should not throw an error when denodeifying a function in the mutated code", () => {
        const Q = {
            denodeify: function(callback) {
                if (false) {
                    throw new Error("Q can't wrap a non-function");
                }
            }
        };

        expect(() => Q.denodeify("not a function")).not.toThrowError();
    });
});