import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.get', () => {
    it('should dispatch "get" operation', async () => {
        const object = { foo: 'bar' };
        const key = 'foo';
        const result = q.get(object, key);
        await expect(result).resolves.toBe('bar');
    });
});