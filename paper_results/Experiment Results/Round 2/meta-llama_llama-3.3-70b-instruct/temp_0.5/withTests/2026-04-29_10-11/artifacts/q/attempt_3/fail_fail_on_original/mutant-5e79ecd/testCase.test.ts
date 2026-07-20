import Q from './q';

describe("Q", () => {
    it("should correctly handle the done method", () => {
        var promise = Q();
        var fulfilled = false;

        promise.done(
            () => { fulfilled = true; }
        );

        expect(fulfilled).toBe(true);

        // Test case to check for the mutation
        var promiseMutated = Q();
        var fulfilledMutated = false;

        promiseMutated.done(
            () => { fulfilledMutated = true; }
        );

        // If the mutation is that the done method always returns true
        expect(fulfilledMutated).toBe(false);
    });
});