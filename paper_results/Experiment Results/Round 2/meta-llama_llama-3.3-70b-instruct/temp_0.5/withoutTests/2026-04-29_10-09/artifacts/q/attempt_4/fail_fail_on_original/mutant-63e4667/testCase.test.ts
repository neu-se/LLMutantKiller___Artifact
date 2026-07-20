import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return an empty array when getting keys of an object', async () => {
        const object = {};
        const promise = Q(object).keys();
        const keys = await promise;
        expect(keys.length).toBe(0);
    });
});