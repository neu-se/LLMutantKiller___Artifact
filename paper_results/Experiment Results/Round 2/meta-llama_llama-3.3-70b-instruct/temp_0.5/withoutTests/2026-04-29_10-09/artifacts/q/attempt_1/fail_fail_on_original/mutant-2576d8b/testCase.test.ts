import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should correctly handle promise chains', () => {
        const promise = Q.resolve(1)
            .then((value) => {
                return Q.resolve(value + 1);
            })
            .then((value) => {
                return Q.resolve(value + 1);
            });

        return promise.then((result) => {
            expect(result).toBe(3);
        });
    });
});