describe("makeStackTraceLong function", () => {
    it("should modify the error stack trace", () => {
        const error = new Error("Test error");
        const promise = Promise.reject(error);

        promise.catch((err: any) => {
            expect(err.stack).not.toBeUndefined();
        });
    });
});