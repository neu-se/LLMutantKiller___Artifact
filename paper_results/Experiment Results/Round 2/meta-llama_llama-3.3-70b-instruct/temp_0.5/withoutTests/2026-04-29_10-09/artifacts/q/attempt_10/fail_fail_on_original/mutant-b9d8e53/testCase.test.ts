describe("Q", () => {
    it("should correctly parse the stack line", () => {
        const stackLine = "at foo (bar.js:10:34)";
        const attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
        const attempt2 = /at .+ \((.+):(\d):(?:\d+)\)$/.exec(stackLine);
        if (attempt1 && attempt2) {
            expect(attempt1[2]).not.toBe(attempt2[2]);
        } else {
            expect(attempt1).not.toBeNull();
            expect(attempt2).not.toBeNull();
        }
    });
});