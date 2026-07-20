import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should properly handle the laterQueue', () => {
        const promise = Q.promise((resolve, reject) => {
            Q.nextTick.runAfter(() => {
                resolve();
            });
        });
        expect(promise.isPending()).toBe(true);
        return promise.then(() => {
            expect(true).toBe(true);
        });
    });
});