import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should set a property correctly', async () => {
        const obj = {};
        const promise = Q(obj).set('key', 'value');
        await promise;
        expect(Object.keys(obj)).toHaveLength(1);
        expect(obj.key).toBe('value');
    });
});