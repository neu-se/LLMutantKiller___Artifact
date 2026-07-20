import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should delete a property from an object', () => {
        const object = { foo: 'bar' };
        const promise = Q(object);
        const deletedPromise = Q["delete"](object, 'foo');
        expect(deletedPromise).toBeInstanceOf(Q);
        deletedPromise.then(() => {
            expect(object).not.toHaveProperty('foo');
        });
    });
});