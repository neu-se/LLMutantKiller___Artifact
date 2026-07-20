import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", () => {
    it("should handle process object correctly", () => {
        const originalProcess = global.process;
        global.process = { nextTick: jest.fn(), emit: jest.fn() } as any;
        const promise = Q.reject(new Error("Test error"));
        Q.nextTick.runAfter(() => {
            if (typeof global.process === "object" && typeof global.process.emit === "function" && global.process.emit) {
                // @ts-ignore
                global.process.emit("unhandledRejection", promise);
            }
        });
        Q.nextTick(() => {
            expect(global.process.emit).toHaveBeenCalledTimes(1);
        });
        global.process = originalProcess;
    });
});