import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly dispatch the set operation', async () => {
        const obj = {};
        const promise = Q(obj).set('key', 'value');
        await promise;
        expect(obj.key).toBe('value');
    });

    it('should not set a property when the operation name is empty', async () => {
        const obj = {};
        const promise = Q(obj).dispatch("", ['key', 'value']);
        await promise;
        expect(obj.key).toBeUndefined();
    });
});