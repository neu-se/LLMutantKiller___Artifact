describe("Q", () => {
    it("should throw an error when finally callback is not a function in mutated code", () => {
        const Q = {
            finally: function(callback) {
                if (typeof callback === "function") {
                    throw new Error("Q can't apply finally callback");
                }
            }
        };
        expect(() => Q.finally(null)).toThrowError();
    });
});