import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should test the behavior of spread', () => {
        const promise = Q([Q(1), Q(2)]).spread((a: number, b: number) => {
            return a + b;
        });
        return promise.then((result: number) => {
            expect(result).toBe(3);
        });
    });
});