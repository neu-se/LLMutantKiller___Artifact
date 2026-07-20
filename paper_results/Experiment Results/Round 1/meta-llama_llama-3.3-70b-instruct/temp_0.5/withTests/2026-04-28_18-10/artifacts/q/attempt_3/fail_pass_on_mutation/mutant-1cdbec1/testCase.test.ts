describe("Q function behavior", () => {
    it("should correctly handle the mutation", () => {
        const originalCode = `
            if (typeof window !== "undefined" || typeof self !== "undefined") {
        `;
        const mutatedCode = `
            if (typeof window !== "undefined" && typeof self !== "undefined") {
        `;

        expect(originalCode).not.toBe(mutatedCode);
    });
});