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

        // Add a timeout to wait for the nextTick to run
        setTimeout(() => {
            expect(spyProcessEmit).toHaveBeenCalledTimes(1);
            process.emit = originalProcessEmit;
        }, 10);
    });
});