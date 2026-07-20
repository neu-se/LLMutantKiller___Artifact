import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.delete', () => {
    it('should dispatch with the correct operation name', () => {
        const obj = { foo: 'bar' };
        const promise = Q(obj).dispatch("delete", ['foo']);
        return promise.then(() => {
            expect(obj).not.toHaveProperty('foo');
        });
    });

    it('should throw an error when operation name is empty', () => {
        const obj = { foo: 'bar' };
        const promise = Q(obj).dispatch("", ['foo']);
        return expect(promise).rejects.toThrowError("Promise does not support operation: ");
    });
});