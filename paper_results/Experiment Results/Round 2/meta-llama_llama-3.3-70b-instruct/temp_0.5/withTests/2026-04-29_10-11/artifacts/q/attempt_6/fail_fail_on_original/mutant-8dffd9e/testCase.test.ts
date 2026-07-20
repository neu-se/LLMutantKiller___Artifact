describe("Promise.isPending", function () {
    it("should return false for a non-pending promise", function () {
        var promise = Promise.resolve(10);
        expect(promise.isPending()).toBe(false);
    });
});