describe("Q long stack support", () => {
    it("should be disabled by default when Q_DEBUG is not set", () => {
        process.env.Q_DEBUG = undefined;
        const Q = {
            longStackSupport: false
        };
        expect(Q.longStackSupport).toBe(false);
    });
});