import { Q } from "../../../../../q.js";

describe('Q', () => {
    it('should return the correct keys for an object', () => {
        const object = { a: 1, b: 2, c: 3 };
        const keys = Q(object).keys();
        return keys.then(result => {
            expect(result).toEqual(['a', 'b', 'c']);
        });
    });
});