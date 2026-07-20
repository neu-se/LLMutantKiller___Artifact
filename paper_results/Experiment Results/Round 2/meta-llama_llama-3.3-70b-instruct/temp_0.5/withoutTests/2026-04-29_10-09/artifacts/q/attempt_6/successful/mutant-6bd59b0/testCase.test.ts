import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
    it('should return a promise for the property value', () => {
        const obj = { foo: 'bar', get: () => 'baz' };
        const promise = q(obj).get('foo');
        return promise.then((value) => {
            expect(value).toBe('bar');
        });
    });
});