import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.get', () => {
    it('should dispatch "get" operation', async () => {
        const object = { foo: 'bar' };
        const key = 'foo';
        const result = q.Q(object).get(key);
        await expect(result).resolves.toBe('bar');
    });

    it('should not dispatch empty string operation', async () => {
        const object = { foo: 'bar' };
        const key = 'foo';
        const result = q.Q(object).dispatch("", [key]);
        await expect(result).rejects.toThrow();
    });
});