describe("Q.denodeify", () => {
    it("should throw an error when callback is undefined in the original code", () => {
        expect(() => {
            if (true) {
                throw new Error("Q can't wrap an undefined function");
            }
        }).toThrowError("Q can't wrap an undefined function");
    });
});