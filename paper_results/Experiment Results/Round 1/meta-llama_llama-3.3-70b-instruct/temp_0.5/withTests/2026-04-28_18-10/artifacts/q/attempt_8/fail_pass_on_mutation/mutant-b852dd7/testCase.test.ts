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

        // Check if process.emit is called when process.emit is not a function
        process.emit = undefined;
        q.reject(new Error());
        q.nextTick.runAfter(() => {
            promise.then(() => {}, () => {});
        });

        // Restore process.emit
        process.emit = spyProcessEmit;

        // Check if spyProcessEmit was not called
        expect(spyProcessEmit).not.toHaveBeenCalled();
        process.emit = originalProcessEmit;
    });
});