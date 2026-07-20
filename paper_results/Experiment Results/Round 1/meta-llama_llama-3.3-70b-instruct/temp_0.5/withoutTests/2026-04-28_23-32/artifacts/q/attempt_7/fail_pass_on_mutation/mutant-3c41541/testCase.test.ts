import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.delete', () => {
    it('should dispatch with the correct operation name and reject with an error when operation name is empty', () => {
        const obj = { foo: 'bar' };
        const promise1 = Q(obj).dispatch("delete", ['foo']);
        const promise2 = Q(obj).dispatch("", ['foo']);
        return Promise.all([promise1, promise2.catch((error) => error)]).then(([result1, result2]) => {
            expect(obj).not.toHaveProperty('foo');
            expect(result2).toBeInstanceOf(Error);
        });
    });
});