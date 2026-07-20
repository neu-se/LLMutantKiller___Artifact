import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.delete', () => {
    it('should delete a property from an object', () => {
        const obj = { foo: 'bar', delete: 'test' };
        const promise = Q(obj).delete('foo');
        return promise.then(() => {
            expect(obj).not.toHaveProperty('foo');
            expect(obj.delete).toBe('test');
        });
    });
});