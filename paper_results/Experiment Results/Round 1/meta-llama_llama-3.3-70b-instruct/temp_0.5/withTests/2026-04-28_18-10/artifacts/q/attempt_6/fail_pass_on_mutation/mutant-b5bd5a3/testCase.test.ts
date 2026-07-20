describe("Promise", () => {
    it("should have an exception property when rejected", () => {
        const promise = Promise.reject(new Error("Test Error"));
        expect(promise.catch((error) => error)).resolves.toBeInstanceOf(Error);
    });
});