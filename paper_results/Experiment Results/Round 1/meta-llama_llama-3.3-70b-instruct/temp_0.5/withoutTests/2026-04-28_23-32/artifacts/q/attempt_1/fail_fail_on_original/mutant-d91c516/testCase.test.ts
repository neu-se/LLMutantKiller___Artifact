import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.keys', () => {
    it('should dispatch "keys" to the promise', () => {
        const object = { a: 1, b: 2 };
        const promise = Q(object);
        const keys = promise.keys();
        expect(keys.inspect().state).toBe('pending');
        promise.resolve();
        expect(keys.inspect().state).toBe('fulfilled');
        expect(keys.inspect().value).toEqual(Object.keys(object));
    });
});