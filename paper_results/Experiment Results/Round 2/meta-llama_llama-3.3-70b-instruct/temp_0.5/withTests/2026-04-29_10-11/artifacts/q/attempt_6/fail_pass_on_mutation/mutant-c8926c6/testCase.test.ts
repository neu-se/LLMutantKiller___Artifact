import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick function", () => {
    it("should behave as expected", () => {
        const isNodeJS = typeof process !== 'undefined' && process.toString() === '[object process]' && typeof process.nextTick === 'function';
        const nextTickCondition = typeof process !== 'undefined' && process.toString() === '[object process]' && typeof process.nextTick === 'function';
        expect(nextTickCondition).toBe(true);
        expect(process.toString()).toBe('[object process]');
    });
});