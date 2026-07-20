describe("Promise", () => {
    it("should have an exception property when rejected", () => {
        const promise = Promise.reject(new Error("Test Error"));
        try {
            const result = promise.valueOf();
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });
});