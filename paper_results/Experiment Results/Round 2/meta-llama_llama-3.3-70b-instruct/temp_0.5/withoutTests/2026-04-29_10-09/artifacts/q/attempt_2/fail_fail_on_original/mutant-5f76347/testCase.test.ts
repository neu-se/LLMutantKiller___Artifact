import { Q } from "../../../q.js";

describe('Q', () => {
    it('should delete a property from an object', () => {
        const obj = { foo: 'bar' };
        const promise = Q(obj).del('foo');
        return promise.then(() => {
            expect(obj).not.toHaveProperty('foo');
        });
    });
});