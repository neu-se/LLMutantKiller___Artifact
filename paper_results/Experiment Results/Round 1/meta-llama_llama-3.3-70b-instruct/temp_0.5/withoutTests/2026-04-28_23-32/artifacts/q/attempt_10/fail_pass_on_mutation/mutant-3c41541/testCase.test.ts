import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.delete', () => {
    it('should dispatch with the correct operation name "delete"', () => {
        const obj = { foo: 'bar', delete: function() {} };
        const promise = Q(obj).dispatch("delete", []);
        return promise.then(() => {
            expect(obj.delete).toBeInstanceOf(Function);
        });
    });
});