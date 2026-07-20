describe("Q.denodeify", () => {
    it("should return a function when callback is defined", () => {
        const callback = () => { };
        expect(typeof Q.denodeify(callback)).toBe("function");
    });
});