import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
    it("should correctly untrack a handled rejection", async () => {
        // Create a rejected promise
        const rejectedPromise = Q.reject(new Error("test error"));
        const unhandledReasonsBefore = Q.getUnhandledReasons().length;

        // Handle the rejection
        await rejectedPromise.catch(() => {});

        // The rejection should be untracked
        const unhandledReasonsAfter = Q.getUnhandledReasons().length;
        expect(unhandledReasonsAfter).toBe(unhandledReasonsBefore);
    });
});