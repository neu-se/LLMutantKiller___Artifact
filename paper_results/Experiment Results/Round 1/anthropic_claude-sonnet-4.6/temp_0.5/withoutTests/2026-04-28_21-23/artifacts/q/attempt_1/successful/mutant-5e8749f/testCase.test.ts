import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection behavior", () => {
    it("should remove a handled rejection from unhandledReasons", async () => {
        // Reset any existing unhandled rejections
        Q.resetUnhandledRejections();

        // Create a rejected promise
        const reason = new Error("test rejection");
        const rejected = Q.reject(reason);

        // Handle the rejection - this should call untrackRejection internally
        await rejected.then(null, function (err) {
            // rejection handled
            return null;
        });

        // Wait for async operations to complete
        await new Promise<void>((resolve) => setTimeout(resolve, 50));

        // After handling, the unhandled reasons should be empty
        const unhandledReasons = Q.getUnhandledReasons();
        expect(unhandledReasons).toHaveLength(0);
    });
});