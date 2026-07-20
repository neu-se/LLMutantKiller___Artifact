import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Promise', () => {
    it('should call the set method on an object', () => {
        const obj = { a: 1 };
        const promise = Q(obj).set('a', 2);
        return promise.then(() => {
            expect(obj.a).toBe(2);
        });
    });
});