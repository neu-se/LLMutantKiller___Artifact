import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle promise chains', () => {
        const promise = Q(1)
            .then((value: any) => {
                throw new Error('Test error');
            })
            .catch((error: any) => {
                expect(error.stack).toContain('Test error');
                return Q(2);
            })
            .then((value: any) => {
                return Q(value + 1);
            })
            .then((value: any) => {
                expect(value).toBe(3);
            });

        return promise;
    });
});