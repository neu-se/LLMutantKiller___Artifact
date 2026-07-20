describe("getFileNameAndLineNumber", () => {
    it("should correctly parse stack lines", () => {
        const stackLine: string = "at foo.js:123:4";
        const getFileNameAndLineNumber = (stackLine: string) => {
            var attempt2 = /at ([^ ]+):(\d+):(\d+)$/.exec(stackLine);
            return attempt2;
        };
        const result = getFileNameAndLineNumber(stackLine);
        expect(result![2]).toBe("123");
        expect(result![3]).toBe("4");
    });
});