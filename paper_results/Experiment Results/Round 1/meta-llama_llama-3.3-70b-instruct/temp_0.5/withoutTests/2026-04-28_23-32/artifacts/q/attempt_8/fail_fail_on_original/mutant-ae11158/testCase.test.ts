describe("Q.nfapply", () => {
    it("should throw an error when called with no implementation", () => {
        const Q = {
            nfapply: function (callback, args) {}
        };
        expect(() => Q.nfapply(function () {}, [1, 2])).toThrowError();
    });
});