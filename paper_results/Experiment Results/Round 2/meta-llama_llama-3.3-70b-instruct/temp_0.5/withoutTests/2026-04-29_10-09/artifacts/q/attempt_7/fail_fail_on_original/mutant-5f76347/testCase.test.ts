import { Q } from "./q";

describe('Q', () => {
    it('should delete a property from an object', () => {
        const obj = { foo: 'bar', baz: 'qux' };
        const promise = Q(obj).del('foo');
        return promise.then(() => {
            expect(Object.keys(obj)).toEqual(['baz']);
        });
    });
});