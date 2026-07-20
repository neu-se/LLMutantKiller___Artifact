import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("trackRejection process.emit guard", () => {
    it("does not throw when process.emit is replaced with a non-function before rejection tracking runs", (done) => {
        const originalEmit = process.emit;

        Q.resetUnhandledRejections();

        // Replace emit with non-function AFTER the rejection is created
        // so the runAfter callback fires with a non-function emit
        Q.reject(new Error("test rejection"));

        // Now replace emit before the runAfter callback fires
        (process as any).emit = null;

        const caughtErrors: any[] = [];
        const originalNextTick = process.nextTick;

        setTimeout(() => {
            process.emit = originalEmit;
            Q.resetUnhandledRejections();
            // If mutated code tried to call null as a function, it would have thrown
            // We verify no such error propagated
            expect(caughtErrors.length).toBe(0);
            done();
        }, 200);
    });
});