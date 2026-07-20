import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.delete', () => {
    it('should delete a property from an object', () => {
        const obj = { foo: 'bar' };
        const promise = Q(obj).dispatch("delete", ['foo']);
        return promise.then(() => {
            expect(obj).not.toHaveProperty('foo');
        });
    });
});