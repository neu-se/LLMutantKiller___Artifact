import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Promise', () => {
    it('should throw an error when set is called without an implementation', () => {
        const obj = {};
        const promise = Q(obj).set('a', 1);
        return promise.then(() => {
            expect(obj.a).toBe(1);
        }).catch((error) => {
            expect(error).toBeInstanceOf(Error);
        });
    });
});