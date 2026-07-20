describe("Q.done", () => {
    it("should call the callback and return nothing when the promise is fulfilled", () => {
        var promise = Q(10);
        var called = false;
        promise.done(function (value: number) {
            called = true;
            expect(value).toBe(10);
        }, function (error: any) {
            expect(true).toBe(false);
        }, function (progress: any) {
            expect(progress).toBeUndefined();
        });
        expect(called).toBe(true);
    });
});