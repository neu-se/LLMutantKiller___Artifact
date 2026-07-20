describe("Q", () => {
    it("should filter out internal frames from stack traces", () => {
        const fileNameAndLineNumber = Q.getFileNameAndLineNumber("    at isInternalFrame (q.js:123:45)");
        expect(fileNameAndLineNumber).toBeDefined();
    });
});