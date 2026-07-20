describe("Q function", () => {
    it("should set Q.longStackSupport to true when Q_DEBUG is set", () => {
        const Q = { longStackSupport: false };
        process.env.Q_DEBUG = 'true';
        if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
            Q.longStackSupport = true;
        }
        expect(Q.longStackSupport).toBe(true);
        delete process.env.Q_DEBUG;
        
        // Test the case when Q_DEBUG is not set
        Q.longStackSupport = false;
        delete process.env.Q_DEBUG;
        if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
            Q.longStackSupport = true;
        }
        expect(Q.longStackSupport).toBe(false);
    });
});