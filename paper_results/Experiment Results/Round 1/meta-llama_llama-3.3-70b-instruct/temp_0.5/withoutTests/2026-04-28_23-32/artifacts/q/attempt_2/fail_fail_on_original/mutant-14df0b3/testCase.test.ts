import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should delete a property from an object', () => {
        const object = { foo: 'bar' };
        const deletedPromise = Q(object).dispatch("delete", ['foo']);
        expect(deletedPromise).resolves.toEqual(undefined);
        deletedPromise.then(() => {
            expect(object).not.toHaveProperty('foo');
        });
    });
});