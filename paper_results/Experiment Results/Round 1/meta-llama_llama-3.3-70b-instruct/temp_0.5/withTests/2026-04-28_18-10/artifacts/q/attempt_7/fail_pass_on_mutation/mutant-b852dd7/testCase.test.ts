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

        // Check if process.emit is called with the correct condition
        setTimeout(() => {
            expect(spyProcessEmit.mock.calls[0][0]).toBe('unhandledRejection');
            expect(typeof process.emit === "function").toBe(true);
            process.emit = originalProcessEmit;
        }, 10);
    });
});