import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should delete a property from an object', () => {
        const object = { foo: 'bar' };
        const promise = Q(object).dispatch("delete", ['foo']);
        expect(promise).resolves.toBeUndefined();
        promise.then(() => {
            expect(object).not.toHaveProperty('foo');
        });
    });
});