import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Promise', () => {
    it('should call the set method on an object and return undefined', () => {
        const obj = {};
        const promise = Q(obj).set('a', 1);
        return promise.then((result) => {
            expect(result).toBeUndefined();
            expect(obj.a).toBe(1);
        });
    });
});