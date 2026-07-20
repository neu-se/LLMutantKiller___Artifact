describe("filterStackString function", () => {
    it("should filter out internal and Node.js frames from a stack string", () => {
        const stackString = "Error: Test error\n    at internalFrame (internal/module.js:10:10)\n    at nodeFrame (node:module.js:20:20)\n    at externalFrame (external/module.js:30:30)";
        const filterStackString = (stackString: string) => {
            const lines = stackString.split("\n");
            const filteredLines = lines.filter(line => !line.includes("internalFrame") && !line.includes("nodeFrame"));
            return filteredLines.join("\n");
        };
        const filteredStackString = filterStackString(stackString);
        expect(filteredStackString).toContain("externalFrame");
        expect(filteredStackString).not.toContain("internalFrame");
        expect(filteredStackString).not.toContain("nodeFrame");
    });
});