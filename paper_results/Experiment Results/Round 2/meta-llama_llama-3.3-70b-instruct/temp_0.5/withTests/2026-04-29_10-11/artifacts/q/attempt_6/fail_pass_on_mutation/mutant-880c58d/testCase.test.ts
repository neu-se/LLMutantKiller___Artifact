describe("Q long stack support", () => {
    it("should be disabled by default and enabled when Q_DEBUG environment variable is set", () => {
        const Q = {
            longStackSupport: false
        };
        expect(Q.longStackSupport).toBe(false);
        process.env.Q_DEBUG = 'true';
        Q.longStackSupport = true;
        expect(Q.longStackSupport).toBe(true);
        delete process.env.Q_DEBUG;
    });
});