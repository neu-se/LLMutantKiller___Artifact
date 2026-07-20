describe("Promise.isPending", function () {
    it("should return true for a pending promise", function () {
        var promise = new Promise((resolve, reject) => {
            // Do nothing, keep the promise pending
        });
        // The mutated code should incorrectly return false for a pending promise
        expect(promise.isPending()).toBe(true);
    });
});