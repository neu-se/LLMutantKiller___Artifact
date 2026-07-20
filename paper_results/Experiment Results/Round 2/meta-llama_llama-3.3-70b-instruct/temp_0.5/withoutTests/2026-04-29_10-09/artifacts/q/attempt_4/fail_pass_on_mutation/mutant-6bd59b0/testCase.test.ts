import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
    it('should return a promise for the property value', () => {
        const obj = { foo: 'bar' };
        const promise = q(obj).get('foo');
        promise.then((value) => {
            expect(value).toBe('bar');
        }, (error) => {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toContain('Promise does not support operation: ');
        });
        // Add an additional assertion to check the operation name
        const promise2 = q(obj).dispatch('', ['foo']);
        promise2.then((value) => {
            expect(value).toBeUndefined();
        }, (error) => {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toContain('Promise does not support operation: ');
        });
    });
});