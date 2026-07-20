describe("Q", () => {
    it("should create a promise with a correct stack trace", () => {
        const error = new Error();
        const promise = Q.reject(error);
        const stack = promise.catch((e: any) => e.stack);
        expect(stack).toContain("makeStackTraceLong");
    });
});