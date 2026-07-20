describe("Q.denodeify", () => {
    it("should throw an error when calling Q.denodeify with undefined in the mutated code", () => {
        const Q = {
            denodeify: () => {}
        };
        expect(() => Q.denodeify(undefined)).toThrowError();
    });
});