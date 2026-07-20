import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle promise chains', () => {
        const promise = Q(1)
            .then((value: any) => {
                return Q(value + 1);
            })
            .then((value: any) => {
                return Q(value + 1);
            });

        return promise.then((result: any) => {
            expect(result).toBe(3);
        });
    });
});