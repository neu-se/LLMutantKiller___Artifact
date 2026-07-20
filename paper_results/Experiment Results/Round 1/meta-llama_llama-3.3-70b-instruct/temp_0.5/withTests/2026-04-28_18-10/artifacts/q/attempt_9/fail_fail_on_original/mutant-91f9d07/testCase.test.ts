describe("Q.denodeify", () => {
    it("should return a function when given a function", () => {
        const callback = () => { };
        const denodeified = Q.denodeify(callback);
        expect(typeof denodeified).toBe("function");
    });
});