import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should delete a property from an object', () => {
        const obj = { a: 1, b: 2 };
        return Q(obj).delete('a').then((result) => {
            expect(result).toBeUndefined();
            expect(obj).toEqual({ b: 2 });
        });
    });

    it('should not delete a property when using an empty string in the mutated code', () => {
        const obj = { a: 1, b: 2 };
        return Q(obj).delete('').then((result) => {
            expect(result).toBeUndefined();
            expect(obj).toEqual({ a: 1, b: 2 });
        });
    });
});