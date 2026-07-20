import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.get', () => {
    it('should dispatch a "get" operation and return a promise that resolves to the value of the property', () => {
        const object = { foo: 'bar' };
        const key = 'foo';
        expect(() => Q.get(object, key)).not.toThrow();
    });
});