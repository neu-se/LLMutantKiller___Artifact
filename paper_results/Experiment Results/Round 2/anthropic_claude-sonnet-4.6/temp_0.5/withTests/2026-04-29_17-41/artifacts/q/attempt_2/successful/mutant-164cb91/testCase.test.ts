import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandledRejection event emission", () => {
    it("should emit unhandledRejection process event for unhandled rejected promises", (done) => {
        Q.resetUnhandledRejections();

        const reason = new Error("test unhandled rejection for mutation detection");
        let emittedReason: any = null;

        const handler = (r: any) => {
            if (r === reason) {
                emittedReason = r;
            }
        };

        process.on("unhandledRejection", handler);

        // Create a rejected promise that is not handled
        Q.reject(reason);

        // Wait long enough for the runAfter callbacks to fire
        // runAfter fires after the flush loop completes, which happens in a future tick
        setTimeout(() => {
            process.removeListener("unhandledRejection", handler);
            try {
                expect(emittedReason).toBe(reason);
                done();
            } catch (e) {
                done(e);
            }
        }, 100);
    });
});