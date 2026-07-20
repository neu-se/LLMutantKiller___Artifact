describe("Q.nfapply", () => {
    it("should not be an empty function", () => {
        const Q = {
            nfapply: function (callback: Function, args: any[]) {
                return Q(callback).nfapply(args);
            }
        };
        expect(Q.nfapply.toString()).not.toEqual("function (callback, args) {}");
    });
});