describe("Q function", () => {
    it("should create a promise that resolves with the given value", () => {
        const promise = Q(10);
        expect(promise.isFulfilled()).toBe(true);
    });

    it("should create a promise that rejects with the given reason", () => {
        const promise = Q.reject("error");
        expect(promise.isRejected()).toBe(true);
    });
});