describe("Regular Expressions", () => {
    it("should correctly parse stack lines with line numbers", () => {
        const stackLine = "at foo (bar.js:12:20)";
        const attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
        const attempt2 = /at .+ \((.+):(\d):(?:\d+)\)$/.exec(stackLine);
        if (attempt1 && attempt2) {
            expect(attempt1[2].length).toBeGreaterThan(attempt2[2].length); // This will pass on the original code and fail on the mutated code
        } else {
            expect(attempt1).not.toBeNull(); // This will fail the test if attempt1 is null
            expect(attempt2).toBeNull(); // This will fail the test if attempt2 is not null
        }
    });
});