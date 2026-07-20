import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return a promise when get is called with a valid key', () => {
        const object = { foo: 'bar' };
        const promise = Q(object).get("foo");
        expect(promise.then).toBeInstanceOf(Function);
    });
});