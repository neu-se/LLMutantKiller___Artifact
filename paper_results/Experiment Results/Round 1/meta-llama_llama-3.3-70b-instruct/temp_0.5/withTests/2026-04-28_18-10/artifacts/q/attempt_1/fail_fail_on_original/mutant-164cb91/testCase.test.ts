import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q library', () => {
    it('should track unhandled rejections', () => {
        const deferred = Q.defer();
        Q.nextTick.runAfter(function () {
            if (Q.unhandledRejections.indexOf(deferred.promise) !== -1) {
                expect(true).toBe(true);
            }
        });
        Q.unhandledRejections.push(deferred.promise);
        Q.nextTick.runAfter(function () {
            expect(Q.unhandledRejections.length).toBe(1);
        });
    });
});