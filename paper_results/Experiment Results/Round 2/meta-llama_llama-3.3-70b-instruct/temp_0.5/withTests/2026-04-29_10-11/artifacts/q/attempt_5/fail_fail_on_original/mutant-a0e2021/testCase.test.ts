describe('Q function', () => {
    it('should set Q.longStackSupport to true when Q_DEBUG is set in process.env', () => {
        process.env.Q_DEBUG = 'true';
        const originalCode = `
            if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
                Q.longStackSupport = true;
            }
        `;
        const mutatedCode = `
            if (true && process.env.Q_DEBUG) {
                Q.longStackSupport = true;
            }
        `;
        const originalResult = eval(originalCode);
        const mutatedResult = eval(mutatedCode);
        expect(mutatedResult).not.toBe(originalResult);
    });
});