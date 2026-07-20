import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("trackRejection process.emit guard", () => {
    it("skips process.emit call when process.emit is not a function", (done) => {
        Q.resetUnhandledRejections();

        const originalEmit = process.emit;
        
        // Replace emit BEFORE creating the rejection, so it's non-function
        // when both the condition check AND the emit call happen
        (process as any).emit = "not-a-function";

        let errorCaught: Error | null = null;
        const uncaughtHandler = (err: Error) => {
            errorCaught = err;
        };
        process.on("uncaughtException", uncaughtHandler);

        Q.reject(new Error("test"));

        setTimeout(() => {
            (process as any).emit = originalEmit;
            process.removeListener("uncaughtException", uncaughtHandler);
            Q.resetUnhandledRejections();

            // Original (&&): condition false when emit is not a function → no error
            // Mutated (||): condition true (process is object) → tries to call string → error
            expect(errorCaught).toBeNull();
            done();
        }, 300);
    });
});