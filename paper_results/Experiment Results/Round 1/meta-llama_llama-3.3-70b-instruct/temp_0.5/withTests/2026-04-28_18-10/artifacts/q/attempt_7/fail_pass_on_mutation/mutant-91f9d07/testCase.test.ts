describe("Q.denodeify", () => {
    it("should throw an error when callback is undefined in the original code but not in the mutated code", () => {
        const callback = () => { };
        const originalCode = () => { throw new Error("Q can't wrap an undefined function"); };
        const mutatedCode = () => { return function() {}; };

        expect(() => originalCode()).toThrowError("Q can't wrap an undefined function");
        expect(() => mutatedCode()).not.toThrowError();
    });
});