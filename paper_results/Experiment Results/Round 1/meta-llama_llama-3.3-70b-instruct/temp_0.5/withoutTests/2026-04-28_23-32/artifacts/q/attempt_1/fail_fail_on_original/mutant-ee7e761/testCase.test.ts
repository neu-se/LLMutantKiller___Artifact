import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should delete a property from an object', () => {
        const obj = Q({
            foo: 'bar',
            baz: 'qux'
        });
        obj.delete('foo');
        expect(obj.inspect().value).toEqual({ baz: 'qux' });
    });
});