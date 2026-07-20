describe("Q", () => {
    it("should handle errors correctly", () => {
        const error = new Error("Test error");
        const promise = Promise.reject(error);
        promise.catch((err: any) => {
            expect(err).toBeInstanceOf(Error);
        });
    });
});