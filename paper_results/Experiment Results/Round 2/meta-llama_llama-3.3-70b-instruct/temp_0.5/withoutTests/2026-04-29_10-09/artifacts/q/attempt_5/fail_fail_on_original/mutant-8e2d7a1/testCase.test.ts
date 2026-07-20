import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should set a property correctly and not set it when operation is empty', async () => {
        const obj = {};
        const promise1 = Q(obj).set('key', 'value');
        await promise1;
        expect(obj).toHaveProperty('key', 'value');

        const obj2 = {};
        const promise2 = Q(obj2).dispatch("", ['key', 'value']);
        await promise2;
        expect(obj2).not.toHaveProperty('key');
    });
});