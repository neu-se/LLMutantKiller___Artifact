import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should delete a property from an object', () => {
        const obj = Q({
            foo: 'bar',
            baz: 'qux'
        });
        const result = obj.dispatch("delete", ["foo"]);
        expect(result.then(value => value)).resolves.toEqual({ baz: 'qux' });
    });
});