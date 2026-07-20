import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should correctly handle the done method", () => {
        var promise = Q();
        var fulfilled = false;
        var rejected = false;
        var progress = false;

        promise.done(
            () => { fulfilled = true; },
            () => { rejected = true; },
            () => { progress = true; }
        );

        expect(fulfilled).toBe(true);
        expect(rejected).toBe(false);
        expect(progress).toBe(false);

        // Test case to check for the mutation
        var promiseMutated = Q();
        var fulfilledMutated = false;
        var rejectedMutated = false;
        var progressMutated = false;

        promiseMutated.done(
            () => { fulfilledMutated = true; },
            () => { rejectedMutated = true; },
            () => { progressMutated = true; }
        );

        // If the mutation is that the done method always returns true
        expect(fulfilledMutated).toBe(false);
    });
});