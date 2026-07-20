describe("Q.denodeify", () => {
    it("should throw an error when callback is undefined", () => {
        const callback = () => { throw new Error("Q can't wrap an undefined function"); };
        expect(() => Q.denodeify(undefined)).toThrowError("Q can't wrap an undefined function");
    });
});