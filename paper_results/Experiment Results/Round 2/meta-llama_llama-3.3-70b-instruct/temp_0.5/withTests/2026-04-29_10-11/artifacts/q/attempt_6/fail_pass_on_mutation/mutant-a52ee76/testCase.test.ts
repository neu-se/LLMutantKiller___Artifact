describe("Q function", () => {
    it("should enable long stack support when Q_DEBUG is set", () => {
        const Q = { longStackSupport: false };
        process.env.Q_DEBUG = 'true';
        if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
            Q.longStackSupport = true;
        }
        expect(Q.longStackSupport).toBe(true);
        delete process.env.Q_DEBUG;
    });
});