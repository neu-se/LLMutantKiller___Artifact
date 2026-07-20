import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should properly handle the laterQueue', () => {
        const deferred = Q.defer();
        Q.nextTick.runAfter(() => {
            deferred.resolve();
        });
        return deferred.promise.then(() => {
            expect(Q.nextTick.laterQueue.length).toBe(0);
        });
    });
});