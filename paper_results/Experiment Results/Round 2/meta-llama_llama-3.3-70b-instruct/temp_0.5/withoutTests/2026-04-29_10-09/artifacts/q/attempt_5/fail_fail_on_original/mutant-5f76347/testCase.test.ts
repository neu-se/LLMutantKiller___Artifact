import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should delete a property from an object', () => {
        const obj = { foo: 'bar', baz: 'qux' };
        const promise = Q(obj).del('foo');
        return promise.then(() => {
            expect(obj).not.toHaveProperty('foo');
            expect(obj.baz).toBe('qux');
        });
    });
});