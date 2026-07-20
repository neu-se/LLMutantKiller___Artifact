import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return an array length of 0 when getting keys of an empty object', async () => {
        const object = {};
        const promise = Q(object).keys();
        const keys = await promise;
        expect(keys.length).toBe(0);
    });
});