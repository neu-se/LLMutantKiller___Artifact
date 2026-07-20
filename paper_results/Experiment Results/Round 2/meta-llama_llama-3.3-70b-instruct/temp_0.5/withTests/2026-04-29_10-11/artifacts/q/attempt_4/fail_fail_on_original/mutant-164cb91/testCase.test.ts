import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle process.emit correctly", () => {
        const promise = q.reject(new Error("Test error"));
        const originalEmit = process.emit;
        let emitCalled = false;
        process.emit = function(event: any, ...args: any[]) {
            if (event === "unhandledRejection") {
                emitCalled = true;
            }
            return (originalEmit as any).apply(process, arguments);
        };
        q.nextTick.runAfter(() => {
            if (promise.isRejected()) {
                process.emit("unhandledRejection", promise.inspect().reason, promise);
            }
        });
        expect(emitCalled).toBe(true);
    });
});