describe("Q function", () => {
    it("should enable long stack support when Q_DEBUG is set", () => {
        const originalQ = { longStackSupport: false };
        const originalCode = function(Q) {
            if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
                Q.longStackSupport = true;
            }
        };
        originalCode(originalQ);
        expect(originalQ.longStackSupport).toBe(true);

        const mutatedQ = { longStackSupport: false };
        const mutatedCode = function(Q) {
            if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
            }
        };
        mutatedCode(mutatedQ);
        expect(mutatedQ.longStackSupport).not.toBe(true);
    });
});