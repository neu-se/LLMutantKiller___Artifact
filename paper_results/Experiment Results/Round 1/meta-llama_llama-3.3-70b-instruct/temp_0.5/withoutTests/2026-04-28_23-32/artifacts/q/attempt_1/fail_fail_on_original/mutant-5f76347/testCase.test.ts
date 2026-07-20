import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should delete a property from an object', () => {
        const object = { foo: 'bar' };
        const promise = Q(object).del('foo');
        promise.then((result) => {
            expect(result).toBeUndefined();
            expect(object).not.toHaveProperty('foo');
        });
    });
});