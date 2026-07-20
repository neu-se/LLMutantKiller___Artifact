describe("Q.denodeify", () => {
    it("should return a function when callback is defined", () => {
        const callback = () => { };
        const denodeified = Q.denodeify(callback);
        expect(typeof denodeified).toBe("function");
    });
});