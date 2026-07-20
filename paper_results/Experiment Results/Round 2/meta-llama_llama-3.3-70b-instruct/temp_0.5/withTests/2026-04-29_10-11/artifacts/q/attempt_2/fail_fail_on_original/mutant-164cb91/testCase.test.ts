import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle process.emit correctly", () => {
        const promise = Q.reject(new Error("Test error"));
        const originalEmit = process.emit;
        let emitCalled = false;
        process.emit = function(event: string, ...args: any[]) {
            if (event === "unhandledRejection") {
                emitCalled = true;
            }
            return originalEmit.apply(process, arguments);
        };
        Q.nextTick.runAfter(() => {
            if (promise.isRejected()) {
                process.emit("unhandledRejection", promise.inspect().reason, promise);
            }
        });
        expect(emitCalled).toBe(true);
    });
});