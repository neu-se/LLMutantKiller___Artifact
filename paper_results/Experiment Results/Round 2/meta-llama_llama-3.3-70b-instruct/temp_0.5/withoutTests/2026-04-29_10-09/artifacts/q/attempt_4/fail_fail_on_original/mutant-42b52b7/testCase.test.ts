import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should handle unhandled rejections correctly", () => {
        const originalProcessEmit = global.process && global.process.emit;
        const emitSpy = jest.fn();
        if (global.process) {
            global.process.emit = emitSpy;
        }
        Q.nextTick.runAfter(() => {
            throw new Error("Test error");
        });
        if (global.process) {
            expect(emitSpy).toHaveBeenCalledTimes(0);
            global.process.emit = originalProcessEmit;
        }
    });
});