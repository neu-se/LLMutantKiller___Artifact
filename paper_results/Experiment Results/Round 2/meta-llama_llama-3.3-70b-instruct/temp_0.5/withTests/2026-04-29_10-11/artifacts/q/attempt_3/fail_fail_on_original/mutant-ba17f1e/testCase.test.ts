describe("q.js", () => {
    it("should throw an error when getFileNameAndLineNumber function returns an empty array", () => {
        const originalGetFileNameAndLineNumber = Q.getFileNameAndLineNumber;
        Q.getFileNameAndLineNumber = () => [];
        expect(() => Q.captureLine()).toThrowError();
        Q.getFileNameAndLineNumber = originalGetFileNameAndLineNumber;
    });
});