import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return a promise for the property value', () => {
        const obj = { foo: 'bar' };
        const promise = Q(obj).get('foo');
        expect(promise.then((value) => value)).resolves.toBe('bar');
    });
});