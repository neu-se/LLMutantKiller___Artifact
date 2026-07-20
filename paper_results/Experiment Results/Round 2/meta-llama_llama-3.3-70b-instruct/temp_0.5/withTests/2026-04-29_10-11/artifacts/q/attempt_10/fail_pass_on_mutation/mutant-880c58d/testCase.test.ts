describe("Q long stack support", () => {
    it("should be conditionally enabled", () => {
        const Q = {
            longStackSupport: false
        };
        if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
            expect(Q.longStackSupport).toBe(true);
        } else {
            expect(Q.longStackSupport).toBe(false);
        }
    });
});