import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should set a property correctly', () => {
        const obj = {};
        const promise = Q(obj).set('key', 'value');
        return promise.then(() => {
            expect(obj.key).toBe('value');
        });
    });
});