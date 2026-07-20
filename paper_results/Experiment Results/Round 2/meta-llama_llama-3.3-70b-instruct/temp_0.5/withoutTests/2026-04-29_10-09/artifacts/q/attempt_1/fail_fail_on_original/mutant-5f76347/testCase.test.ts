import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should delete a property from an object', () => {
        const obj = { foo: 'bar' };
        const promise = Q(obj).del('foo');
        return promise.then((result) => {
            expect(result).toBeUndefined();
            expect(obj).not.toHaveProperty('foo');
        });
    });
});