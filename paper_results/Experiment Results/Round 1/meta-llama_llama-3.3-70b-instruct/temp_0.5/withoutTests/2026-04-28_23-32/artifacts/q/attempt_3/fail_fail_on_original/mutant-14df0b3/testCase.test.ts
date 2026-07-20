import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should delete a property from an object', () => {
        const object = { foo: 'bar' };
        const result = Q["delete"](object, 'foo');
        expect(result).toBeUndefined();
        expect(object).not.toHaveProperty('foo');
    });
});