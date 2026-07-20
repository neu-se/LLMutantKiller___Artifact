describe("Q.nfapply", () => {
    it("should throw an error when called with no arguments in the mutated code", () => {
        expect(() => Q.nfapply()).toThrowError();
        const callback = (arg1: any, arg2: any) => {
            return arg1 + arg2;
        };
        const args = [1, 2];
        expect(() => Q.nfapply(callback, args)).toThrowError();
    });
});