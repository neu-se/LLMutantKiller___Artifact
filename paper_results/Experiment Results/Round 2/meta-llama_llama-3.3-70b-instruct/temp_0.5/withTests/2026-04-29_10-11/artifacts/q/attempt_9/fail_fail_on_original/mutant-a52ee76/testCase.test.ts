describe("Q function", () => {
    it("should throw an error if Q.longStackSupport is not set to true when Q_DEBUG is set", () => {
        const Q = { longStackSupport: false };
        process.env.Q_DEBUG = 'true';
        if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
            // do nothing
        }
        expect(Q.longStackSupport).toBe(true);
        delete process.env.Q_DEBUG;
    });
});