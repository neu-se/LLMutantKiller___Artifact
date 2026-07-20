import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle promise chains', () => {
        const promise = Q.resolve(1)
            .then((value: any) => {
                return Q.resolve(value + 1);
            })
            .then((value: any) => {
                return Q.resolve(value + 1);
            })
            .then((value: any) => {
                expect(value).toBe(3);
            });

        return promise;
    });
});