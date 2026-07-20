describe("isInternalFrame", () => {
    it("should return false for a non-internal frame", () => {
        const line = "Error: Test error at test.ts:1:1";
        // @ts-ignore
        const result = isInternalFrame(line);
        expect(result).toBe(false);
    });

    it("should return true for an internal frame", () => {
        const line = "Error: Test error at q.js:1:1";
        // @ts-ignore
        const result = isInternalFrame(line);
        expect(result).toBe(true);
    });
});