describe("Q long stack support", () => {
    it("should not be enabled by default", () => {
        const Q = {
            longStackSupport: false
        };
        expect(Q.longStackSupport).toBe(false);
        if (Q.longStackSupport) {
            throw new Error("Q.longStackSupport should be false");
        }
    });
});