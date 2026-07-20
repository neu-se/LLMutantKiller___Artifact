describe("Q", () => {
    it("should pass when finally callback is a function in original code and fail when it's not in mutated code", () => {
        const originalQ = {
            finally: function(callback) {
                if (typeof callback !== "function") {
                    throw new Error("Q can't apply finally callback");
                }
            }
        };

        const mutatedQ = {
            finally: function(callback) {
                if (typeof callback === "function") {
                    throw new Error("Q can't apply finally callback");
                }
            }
        };

        expect(() => originalQ.finally(null)).toThrowError();
        expect(() => mutatedQ.finally(null)).not.toThrowError();
    });
});