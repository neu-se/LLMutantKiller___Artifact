describe("Q", () => {
    it("should handle isStopIteration correctly", () => {
        const Q = require('../../../../../../../../subject_repositories/q/q');
        class StopIteration extends Error {}
        const exception = new StopIteration();
        expect(Q.isStopIteration(exception)).toBe(true);
        expect(Q.isStopIteration({})).toBe(false);
        expect(Q.isStopIteration(new Error())).toBe(false);
        expect(Q.isStopIteration(true)).toBe(false);
    });
});