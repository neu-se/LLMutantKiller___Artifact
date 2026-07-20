describe("Promise", () => {
    it("should have an exception property when rejected", () => {
        const promise = Q.reject(new Error("Test Error"));
        expect(promise.exception).toBeInstanceOf(Error);
    });
});