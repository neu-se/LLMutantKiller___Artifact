import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should test the behavior of trackRejection function", () => {
        const originalProcessEmit = process.emit;
        const spyProcessEmit = jest.fn();
        process.emit = spyProcessEmit;
        
        const promise = Q.reject(new Error());
        Q.nextTick.runAfter(() => {
            if (typeof process === "object" && process.emit === spyProcessEmit) {
                promise.then(() => {}, () => {});
            }
        });

        expect(spyProcessEmit).toHaveBeenCalledTimes(1);
        process.emit = originalProcessEmit;
    });
});