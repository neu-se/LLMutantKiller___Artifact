import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf mutation test", () => {
    it("should correctly find and remove unhandled rejection using array_indexOf", () => {
        // This test targets the array_indexOf mutation by creating a scenario
        // where Q's unhandled rejection tracking uses array_indexOf to find
        // and remove rejected promises from its tracking arrays
        // The mutation changes `if (this[i] === value)` to `if (false)`
        // which would prevent finding and removing the rejection

        // Reset unhandled rejections tracking
        Q.resetUnhandledRejections();

        // Create and reject a promise
        const rejectedPromise = Q.reject("test rejection");

        // Get the initial state
        return Q.delay(10).then(() => {
            const initialReasons = Q.getUnhandledReasons();
            expect(initialReasons.length).toBeGreaterThan(0);

            // Now handle the rejection (this should remove it from tracking)
            return rejectedPromise.catch(() => {
                // Give time for the rejection to be removed from tracking
                return Q.delay(10).then(() => {
                    const finalReasons = Q.getUnhandledReasons();

                    // The mutation would prevent the rejection from being found and removed
                    // because array_indexOf would always return -1
                    // So finalReasons would still contain the rejection
                    expect(finalReasons.length).toBe(0);
                });
            });
        });
    });
});