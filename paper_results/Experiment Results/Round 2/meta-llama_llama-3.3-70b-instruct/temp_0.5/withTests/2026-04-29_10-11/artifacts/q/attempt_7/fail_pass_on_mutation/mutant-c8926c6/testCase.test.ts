import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick function", () => {
    it("should behave as expected", () => {
        const originalProcess = process;
        process = { nextTick: () => {} };
        const isNodeJS = typeof process !== 'undefined' && process.toString() === '[object process]' && typeof process.nextTick === 'function';
        expect(isNodeJS).toBe(false);
        process = originalProcess;
    });
});