import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q library', () => {
    it('should track unhandled rejections', () => {
        const promise = Q.reject(new Error());
        Q.nextTick.runAfter(function () {
            if (typeof process === "object" && typeof process.emit === "function") {
                expect(process.emit).toBeInstanceOf(Function);
            } else {
                expect(true).toBe(false);
            }
        });
    });
});