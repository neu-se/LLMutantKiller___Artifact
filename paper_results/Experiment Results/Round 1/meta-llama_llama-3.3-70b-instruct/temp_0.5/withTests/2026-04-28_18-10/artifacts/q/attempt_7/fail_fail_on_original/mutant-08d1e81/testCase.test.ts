describe("Q", () => {
    it("should handle unhandled rejections correctly", () => {
        const Q = require('./q');
        const promise = Q.reject(new Error("Test error"));
        expect(promise.isRejected()).toBe(true);
    });
});