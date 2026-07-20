import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return an array with a length equal to the number of properties in the object when getting keys', async () => {
        const object = { a: 1, b: 2, c: 3 };
        const promise = Q(object).keys();
        const keys = await promise;
        expect(keys.length).toBe(Object.keys(object).length);
    });
});