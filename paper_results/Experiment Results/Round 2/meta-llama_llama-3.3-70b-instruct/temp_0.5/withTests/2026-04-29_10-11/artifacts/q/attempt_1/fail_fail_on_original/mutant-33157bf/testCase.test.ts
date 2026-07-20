import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should handle process object correctly", () => {
        const originalProcess = global.process;
        global.process = { emit: jest.fn() };
        const promise = Q.reject(new Error("Test error"));
        Q.nextTick.runAfter(() => {
            promise.catch(() => {});
        });
        expect(global.process.emit).toHaveBeenCalledTimes(1);
        global.process = originalProcess;
    });
});