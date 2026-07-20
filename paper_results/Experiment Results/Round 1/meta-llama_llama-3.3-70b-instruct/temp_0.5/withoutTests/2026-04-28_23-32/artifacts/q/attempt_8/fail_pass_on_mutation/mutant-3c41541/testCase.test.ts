import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.delete', () => {
    it('should dispatch with the correct operation name and reject with an error when operation name is empty', () => {
        const obj = { foo: 'bar' };
        const promise = Q(obj).dispatch("", ['foo']);
        return promise.catch((error) => {
            expect(error.message).toContain("Promise does not support operation: ");
        });
    });
});