import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should throw an error when deleting a property from an object with the mutated code', () => {
        const object = { foo: 'bar' };
        expect(() => Q["delete"](object, 'foo')).toThrowError();
    });
});