import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should set a property correctly', async () => {
        const obj = {};
        const promise = Q(obj).set('key', 'value');
        await promise;
        expect(obj.key).toBe('value');
    });

    it('should throw an error when setting a property with an empty string', async () => {
        const obj = {};
        const promise = Q(obj).set('', 'value');
        await expect(promise).rejects.toThrow();
    });
});