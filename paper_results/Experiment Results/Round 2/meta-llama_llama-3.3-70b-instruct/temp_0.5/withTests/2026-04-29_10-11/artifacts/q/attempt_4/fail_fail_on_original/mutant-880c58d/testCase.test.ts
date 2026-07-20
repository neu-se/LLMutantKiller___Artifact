describe("Q long stack support", () => {
    it("should be disabled by default and not enabled when no condition is met", () => {
        const originalCode = `
            if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
                Q.longStackSupport = true;
            }
        `;
        const mutatedCode = `
            if (true) {
                Q.longStackSupport = true;
            }
        `;

        expect(eval(originalCode).longStackSupport).toBe(false);
        expect(eval(mutatedCode).longStackSupport).toBe(true);
    });
});