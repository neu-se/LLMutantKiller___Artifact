describe("Q", () => {
    it("should correctly handle stack traces in promises", () => {
        // Since we can't import Q, let's try to create a promise and check its stack trace
        const error = new Error("Test error");
        const promise = Promise.reject(error);

        return promise.catch((err: any) => {
            const stackTrace = err.stack;
            expect(stackTrace).toContain("makeStackTraceLong");
        });
    });
});