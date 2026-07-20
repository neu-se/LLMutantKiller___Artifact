import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should throw an error when trying to delete a property with an empty string', () => {
        const obj = Q({
            foo: 'bar',
            baz: 'qux'
        });
        expect(() => obj[""]).toThrowError();
    });
});