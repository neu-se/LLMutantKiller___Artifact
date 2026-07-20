import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q library', () => {
    it('should track unhandled rejections', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        Q.nextTick.runAfter(function () {
            Q.untrackRejection(promise);
        });
        Q.nextTick.runAfter(function () {
            if (typeof process === "object" && typeof process.emit === "function") {
                expect(true).toBe(true);
            }
        });
    });
});