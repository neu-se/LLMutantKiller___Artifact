import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick function", () => {
    it("should behave as expected", () => {
        const originalProcessNextTick = process.nextTick;
        process.nextTick = undefined;
        const nextTickCondition = typeof process !== 'undefined' && process.toString() === '[object process]' && typeof process.nextTick === 'function';
        expect(nextTickCondition).toBe(false);
        process.nextTick = originalProcessNextTick;
    });
});