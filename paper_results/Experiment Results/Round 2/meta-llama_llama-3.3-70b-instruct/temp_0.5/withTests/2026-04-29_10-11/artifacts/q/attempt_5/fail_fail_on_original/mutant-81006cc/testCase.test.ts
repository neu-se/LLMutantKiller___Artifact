import { Q } from "./q";

describe('q', () => {
    it('should pass when run against the original code and fail when run against the mutated code', () => {
        const object = {};
        const name = 'test';
        const args = [1, 2, 3];

        const promise = Q(object).mapply(name, args);
        return promise.then((result) => {
            expect(result).toBeUndefined();
        });
    });
});