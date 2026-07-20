import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return keys of an object', () => {
        const obj = { a: 1, b: 2 };
        const promise = Q(obj).keys();
        expect(promise).toBeInstanceOf(Promise);
    });
});