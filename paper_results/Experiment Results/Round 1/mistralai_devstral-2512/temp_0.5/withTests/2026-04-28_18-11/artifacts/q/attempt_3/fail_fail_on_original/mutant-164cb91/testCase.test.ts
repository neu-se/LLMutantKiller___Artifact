// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-164cb91/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
    it("should track unhandled rejections when process.emit is a function", () => {
        // Simulate a Node.js environment with process.emit
        const originalProcess = global.process;
        const emitSpy = jest.fn();
        global.process = {
            emit: emitSpy,
            nextTick: (callback: Function) => {
                callback();
            }
        } as any;

        // Create and reject a promise without handling it
        Q.reject("test rejection");

        // Wait for the next tick to allow the unhandled rejection tracking to run
        return Q.delay(10).then(() => {
            // Restore original process
            global.process = originalProcess;

            // Verify that process.emit was called with the expected arguments
            expect(emitSpy).toHaveBeenCalledWith("unhandledRejection", "test rejection", expect.anything());
        });
    });
});