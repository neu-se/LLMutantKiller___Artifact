import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise.allSettled', () => {
    it('should return a promise that resolves to an array of settled states', () => {
        const promises = [Q(1), Q.reject(2), Q(3)];
        return Q.allSettled(promises).then((results: any) => {
            expect(results).toEqual([
                { state: 'fulfilled', value: 1 },
                { state: 'rejected', reason: 2 },
                { state: 'fulfilled', value: 3 },
            ]);
        });
    });
});