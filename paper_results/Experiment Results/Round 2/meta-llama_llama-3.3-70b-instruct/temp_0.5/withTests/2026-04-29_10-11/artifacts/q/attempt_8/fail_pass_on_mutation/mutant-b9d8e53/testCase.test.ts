describe("Regular Expressions", () => {
    it("should correctly parse stack lines with line numbers", () => {
        const stackLine = "at foo (bar.js:10:20)";
        const attempt = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
        expect(attempt).not.toBeNull();
        expect(attempt[2].length).toBeGreaterThan(1);
    });
});