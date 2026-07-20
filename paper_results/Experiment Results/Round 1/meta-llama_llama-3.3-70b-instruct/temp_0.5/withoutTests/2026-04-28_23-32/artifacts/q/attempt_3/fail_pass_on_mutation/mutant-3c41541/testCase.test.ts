import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.delete', () => {
    it('should throw an error when operation name is empty', () => {
        const obj = { foo: 'bar' };
        const promise = Q(obj).dispatch("", ['foo']);
        return promise.catch((error) => {
            expect(error).toBeInstanceOf(Error);
        });
    });
});