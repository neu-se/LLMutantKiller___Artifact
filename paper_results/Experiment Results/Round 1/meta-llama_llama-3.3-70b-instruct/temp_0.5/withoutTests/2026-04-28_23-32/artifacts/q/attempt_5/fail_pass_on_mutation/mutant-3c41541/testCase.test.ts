import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.delete', () => {
    it('should throw an error when dispatching with an empty operation name', () => {
        const obj = { foo: 'bar' };
        const promise = Q(obj).dispatch("delete", ['foo']);
        return promise.then(() => {
            throw new Error('Expected an error to be thrown');
        }).catch((error) => {
            expect(error).toBeInstanceOf(Error);
        });
    });
});