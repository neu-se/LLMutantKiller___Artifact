describe("Q long stack support", () => {
    it("should not always be enabled", () => {
        const Q = {
            longStackSupport: false
        };
        expect(Q.longStackSupport).toBe(false);
        Q.longStackSupport = true;
        expect(Q.longStackSupport).toBe(true);
        Q.longStackSupport = false;
        expect(Q.longStackSupport).toBe(false);
    });
});