describe("filterStackString", () => {
    it("should filter out internal frames from stack traces", () => {
        const error = new Error();
        const originalStack = error.stack;

        // @ts-ignore
        const filteredStack = filterStackString(originalStack);

        expect(filteredStack).not.toContain("q.js");
    });
});