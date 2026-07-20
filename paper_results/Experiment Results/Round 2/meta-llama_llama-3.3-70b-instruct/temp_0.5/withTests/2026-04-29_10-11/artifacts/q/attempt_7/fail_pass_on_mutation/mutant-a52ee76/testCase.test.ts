describe("Q function", () => {
    it("should set Q.longStackSupport to true when Q_DEBUG is set", () => {
        const Q = { longStackSupport: false };
        process.env.Q_DEBUG = 'true';
        if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
            Q.longStackSupport = true;
        } else {
            throw new Error("Q_DEBUG is not set");
        }
        expect(Q.longStackSupport).toBe(true);
        delete process.env.Q_DEBUG;
    });
});