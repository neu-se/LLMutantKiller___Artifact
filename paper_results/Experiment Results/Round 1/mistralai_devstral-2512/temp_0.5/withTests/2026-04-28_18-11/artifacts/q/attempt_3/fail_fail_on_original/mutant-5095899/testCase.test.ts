describe("Q library initialization in different environments", () => {
    it("should be available in browser-like environments where self is defined", () => {
        // This test verifies that Q is properly initialized when self exists
        // The mutation would break this by changing the condition from
        // "typeof self !== 'undefined'" to "typeof self === 'undefined'"

        // First verify Q is available (this would fail in mutated version)
        expect(typeof Q).toBe("function");

        // Test basic functionality
        const promise = Q.resolve(42);
        expect(promise.isFulfilled()).toBe(true);

        return promise.then(value => {
            expect(value).toBe(42);
        });
    });
});