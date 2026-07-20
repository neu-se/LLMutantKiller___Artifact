import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('Promise', () => {
    it('should test the behavior of spread', () => {
        const promise = Q([Q(1), Q(2)]).spread((a: any, b: any) => {
            return a + b;
        });
        return promise.then((result: any) => {
            expect(result).toBe(3);
        });
    });
});