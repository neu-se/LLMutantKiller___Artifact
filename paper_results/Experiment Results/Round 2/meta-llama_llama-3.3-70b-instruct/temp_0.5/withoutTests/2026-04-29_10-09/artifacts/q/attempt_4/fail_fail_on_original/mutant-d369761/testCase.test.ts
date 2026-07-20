import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return the correct keys for an object', () => {
        const object = { a: 1, b: 2, c: 3 };
        return Q(object).keys().then(keys => {
            expect(keys).toEqual(Object.keys(object));
        });
    });
});