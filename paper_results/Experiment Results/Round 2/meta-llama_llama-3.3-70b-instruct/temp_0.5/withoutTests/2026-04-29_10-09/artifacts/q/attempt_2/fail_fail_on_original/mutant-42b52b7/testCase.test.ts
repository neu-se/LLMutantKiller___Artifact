import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should handle unhandled rejections correctly", () => {
        const promise = Q.defer().promise;
        const error = new Error("Test error");
        Q.untrackRejection(promise);
        const originalProcessEmit = global.process.emit;
        global.process.emit = jest.fn();
        Q.nextTick.runAfter(() => {
            throw error;
        });
        expect(global.process.emit).toHaveBeenCalledTimes(1);
        expect(global.process.emit).toHaveBeenCalledWith("rejectionHandled", error, promise);
        global.process.emit = originalProcessEmit;
    });
});