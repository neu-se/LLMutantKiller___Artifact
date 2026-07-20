import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise.allSettled', () => {
    it('should return a promise that resolves to an array of settled states', () => {
        const promises = [q(1), q.reject(2), q(3)];
        return q.allSettled(promises).then((results: any) => {
            expect(results).toEqual([
                { state: 'fulfilled', value: 1 },
                { state: 'rejected', reason: 2 },
                { state: 'fulfilled', value: 3 },
            ]);
        });
    });
});