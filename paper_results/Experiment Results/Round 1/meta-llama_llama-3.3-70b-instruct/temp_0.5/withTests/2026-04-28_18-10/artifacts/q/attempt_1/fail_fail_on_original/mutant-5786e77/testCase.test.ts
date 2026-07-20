import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe('Promise', () => {
    it('should test the behavior of spread', () => {
        const promise = Q.spread([Q(1), Q(2)], (a, b) => {
            return a + b;
        });
        return promise.then((result) => {
            expect(result).toBe(3);
        });
    });
});