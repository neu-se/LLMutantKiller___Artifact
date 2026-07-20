import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.keys', () => {
    it('should return a promise for the keys of the object', () => {
        const object = { a: 1, b: 2 };
        const promise = Q(object).keys();
        expect(promise.then).toBeInstanceOf(Function);
    });
});