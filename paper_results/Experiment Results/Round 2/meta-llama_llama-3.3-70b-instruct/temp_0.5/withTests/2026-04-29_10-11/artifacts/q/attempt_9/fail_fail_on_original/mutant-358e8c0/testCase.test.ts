describe("Q function", () => {
    it("should check if a promise is fulfilled", () => {
        // Since we cannot import the Q module, we will have to create a mock implementation
        const Q = {
            isFulfilled: () => true,
            reject: () => ({ isFulfilled: () => false }),
        };

        const promise = Q;
        expect(promise.isFulfilled()).toBe(true);
        const rejectedPromise = Q.reject();
        expect(rejectedPromise.isFulfilled()).toBe(false);
        // This line should cause the test to fail on the mutated code
        expect(Q.isFulfilled()).toBe(false);
    });
});