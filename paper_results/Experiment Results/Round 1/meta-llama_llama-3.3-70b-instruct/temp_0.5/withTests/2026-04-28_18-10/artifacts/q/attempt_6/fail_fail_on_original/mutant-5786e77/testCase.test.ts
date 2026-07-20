import { Q } from "../../../q";

describe('Promise', () => {
    it('should test the behavior of spread', () => {
        const promise = Q([Q(1), Q(2)]).spread((a, b) => {
            return a + b;
        });
        return promise.then((result) => {
            expect(result).toBe(3);
        });
    });
});