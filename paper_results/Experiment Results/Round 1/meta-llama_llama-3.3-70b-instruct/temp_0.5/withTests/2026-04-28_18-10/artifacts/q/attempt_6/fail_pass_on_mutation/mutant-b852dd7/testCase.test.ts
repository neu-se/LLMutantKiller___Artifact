import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should test the behavior of trackRejection function", () => {
        const originalProcessEmit = process.emit;
        const spyProcessEmit = jest.fn();
        process.emit = spyProcessEmit;
        
        const promise = q.reject(new Error());
        q.nextTick.runAfter(() => {
            if (typeof process === "object" && typeof process.emit === "function") {
                promise.then(() => {}, () => {});
            }
        });

        // Check if process.emit is called with the correct arguments
        setTimeout(() => {
            expect(spyProcessEmit).toHaveBeenCalledTimes(1);
            expect(spyProcessEmit).toHaveBeenCalledWith('unhandledRejection', expect.any(Error), promise);
            process.emit = originalProcessEmit;
        }, 10);
    });
});