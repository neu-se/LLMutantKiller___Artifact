import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandledRejection event emission", () => {
    it("should emit unhandledRejection process event for unhandled rejected promises", (done) => {
        Q.resetUnhandledRejections();

        const reason = new Error("test unhandled rejection");
        let emittedReason: any = null;
        let emittedPromise: any = null;

        const handler = (r: any, p: any) => {
            emittedReason = r;
            emittedPromise = p;
        };

        process.on("unhandledRejection", handler);

        // Create a rejected promise that is not handled
        const rejectedPromise = Q.reject(reason);

        // Use runAfter to check after the nextTick processing
        Q.nextTick.runAfter(function () {
            Q.nextTick.runAfter(function () {
                process.removeListener("unhandledRejection", handler);
                try {
                    expect(emittedReason).toBe(reason);
                    expect(emittedPromise).toBe(rejectedPromise);
                    done();
                } catch (e) {
                    done(e);
                }
            });
        });
    });
});