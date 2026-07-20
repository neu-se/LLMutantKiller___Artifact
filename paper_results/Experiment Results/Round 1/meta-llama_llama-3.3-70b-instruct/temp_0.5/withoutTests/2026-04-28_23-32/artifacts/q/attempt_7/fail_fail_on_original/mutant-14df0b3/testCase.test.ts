import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should delete a property from an object', () => {
        const object = { foo: 'bar' };
        const result = Q(object).dispatch("delete", ['foo']);
        expect(result).resolves.toBeUndefined();
        result.then(() => {
            expect(object).toHaveProperty('foo');
        });
    });
});