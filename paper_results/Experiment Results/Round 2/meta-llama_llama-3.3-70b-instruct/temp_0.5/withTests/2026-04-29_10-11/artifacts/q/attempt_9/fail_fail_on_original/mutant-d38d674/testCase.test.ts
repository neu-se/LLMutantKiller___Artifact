describe("Promise constructor", () => {
    it("should handle fallback correctly", () => {
        const Q = require('./q');
        const promise = Q.Promise({}, (op: string) => {
            if (op !== "when") {
                return Q.reject(new Error("Promise does not support operation: " + op));
            } else {
                return Q.resolve();
            }
        });
        return promise.then(
            (value: any) => {
                expect(value).toBeUndefined();
            },
            (error: any) => {
                throw new Error("Promise should not be rejected");
            }
        );
    });
});