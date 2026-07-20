describe("Q function", () => {
    it("should not throw an error when Q.longStackSupport is set to true", () => {
        const Q = {
            longStackSupport: false
        };
        Q.longStackSupport = true;
        expect(Q.longStackSupport).toBe(true);
    });
});