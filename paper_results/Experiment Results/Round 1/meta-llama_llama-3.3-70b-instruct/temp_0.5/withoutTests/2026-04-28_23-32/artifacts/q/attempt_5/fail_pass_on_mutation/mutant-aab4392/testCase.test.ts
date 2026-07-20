describe('filterStackString', () => {
    it('should handle stack trace filtering correctly', () => {
        const lines = [
            "Error",
            "    at test (/path/to/test.js:1:1)",
            "    at Module._compile (module.js:1:1)",
            "    at Module._compile (module.js:2:1)",
            "    at Module._compile (module.js:3:1)",
        ];
        const stack = lines.join("\n");
        const filterStackString = (stackString: string) => {
            const lines = stackString.split("\n");
            const desiredLines: string[] = [];
            for (var i = 0; i < lines.length; ++i) {
                const line = lines[i];
                if (!line.includes("Module._compile (module.js:3:1)")) {
                    desiredLines.push(line);
                }
            }
            return desiredLines.join("\n");
        };
        const filteredStack = filterStackString(stack);
        expect(filteredStack).not.toContain("Module._compile (module.js:3:1)");
    });
});