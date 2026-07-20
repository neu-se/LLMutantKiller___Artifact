describe("Q.nfapply", () => {
    it("should call the callback function when called with a function and arguments", () => {
        const callback = jest.fn();
        const Q = {
            nfapply: function (callback: Function, args: any[]) {
                callback(...args);
            }
        };
        Q.nfapply(callback, [1, 2]);
        expect(callback).toHaveBeenCalledTimes(1);
    });
});