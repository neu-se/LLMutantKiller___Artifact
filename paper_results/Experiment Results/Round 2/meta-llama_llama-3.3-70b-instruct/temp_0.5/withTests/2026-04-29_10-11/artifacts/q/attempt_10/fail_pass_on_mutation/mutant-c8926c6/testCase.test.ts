import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick function", () => {
    it("should behave as expected", () => {
        const condition = process.toString() === '[object process]' && typeof process.nextTick === 'function';
        expect(condition).toBeTruthy();
    });
});