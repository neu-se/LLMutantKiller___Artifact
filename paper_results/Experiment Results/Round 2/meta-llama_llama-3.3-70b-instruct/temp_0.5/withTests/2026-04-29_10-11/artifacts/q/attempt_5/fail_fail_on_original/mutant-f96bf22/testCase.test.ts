describe("makeStackTraceLong", () => {
    it("should filter out internal frames from stack traces", () => {
        const error = new Error();
        const promise = Promise.resolve();

        // @ts-ignore
        makeStackTraceLong(error, promise);

        expect(error.stack).not.toContain("q.js");
    });
});