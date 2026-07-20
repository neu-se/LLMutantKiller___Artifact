describe("Q.timeout", () => {
    it("should reject with a timeout error if the promise is too slow", () => {
        const Q = require('../../../../../q.js');
        const promise = Q.delay(100).timeout(50);
        return promise.then(
            () => {
                expect(true).toBe(false);
            },
            (error: any) => {
                expect(error).toBeInstanceOf(Error);
            }
        );
    });
});