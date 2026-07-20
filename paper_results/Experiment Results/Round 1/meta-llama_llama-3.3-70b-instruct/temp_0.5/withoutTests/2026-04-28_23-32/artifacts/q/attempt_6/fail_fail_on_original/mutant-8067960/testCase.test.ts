import { Q } from "../../../q.js";

describe('Q.get', () => {
    it('should dispatch a "get" operation and return a promise that resolves to the value of the property', () => {
        const object = { foo: 'bar' };
        const key = 'foo';
        const result = Q(object).get(key);
        expect(result.then).toBeDefined();
        return result.then(value => {
            expect(value).toBe('bar');
        });
    });
});