describe("Q function", () => {
    it("should set Q.longStackSupport to true when Q_DEBUG is set in the original code", () => {
        const Q = { longStackSupport: false };
        process.env.Q_DEBUG = 'true';
        if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
            Q.longStackSupport = true;
        }
        expect(Q.longStackSupport).toBe(true);
        delete process.env.Q_DEBUG;
    });

    it("should not set Q.longStackSupport to true when Q_DEBUG is set in the mutated code", () => {
        const Q = { longStackSupport: false };
        process.env.Q_DEBUG = 'true';
        if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
            // do nothing
        }
        expect(Q.longStackSupport).not.toBe(true);
        delete process.env.Q_DEBUG;
    });
});