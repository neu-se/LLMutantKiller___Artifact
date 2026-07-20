import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return the correct keys for an object', () => {
        const object = { a: 1, b: 2, c: 3 };
        const keys = Q.keys(object);
        return keys.then(result => {
            expect(result).toEqual(['a', 'b', 'c']);
        });
    });
});