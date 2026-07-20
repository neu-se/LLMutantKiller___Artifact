import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.get', () => {
    it('should dispatch "get" operation', async () => {
        const object = { foo: 'bar' };
        const key = 'foo';
        const result = Q(object).get(key);
        await expect(result).resolves.toBe('bar');
    });
});