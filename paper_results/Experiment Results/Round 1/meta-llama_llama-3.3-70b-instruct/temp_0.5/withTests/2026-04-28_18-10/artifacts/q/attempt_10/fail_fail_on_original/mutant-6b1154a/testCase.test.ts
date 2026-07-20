describe("Q.done", () => {
    it("should call the callback and return nothing when the promise is fulfilled", () => {
        const Q = require('../../../../q');
        var promise = Q(10);
        var called = false;
        promise.then((value: number) => {
            called = true;
            expect(value).toBe(10);
        }).done((value: number) => {
            expect(called).toBe(true);
        });
    });
});