describe("Q.nfapply", () => {
    it("should return the result of the callback function when called with a function and arguments", () => {
        const callback = (arg1: any, arg2: any) => {
            return arg1 + arg2;
        };
        const args = [1, 2];
        const result = Q.nfapply(callback, args);
        expect(result).resolves.toEqual(3);
    });
});