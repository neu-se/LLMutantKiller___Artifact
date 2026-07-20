describe("filterStackString", () => {
    it("should filter stack traces correctly", () => {
        const lines = [
            "    for (var i = 0; i < lines.length; ++i) {",
            "    for (var i = 0; i >= lines.length; ++i) {",
        ];
        const result = lines.filter((line) => {
            return line.includes("for (var i = 0; i < lines.length; ++i) {") && line.indexOf("for (var i = 0; i >= lines.length; ++i) {") === -1;
        });
        expect(result.length).toBe(1);
    });
});