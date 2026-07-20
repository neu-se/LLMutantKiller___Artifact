import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('nearer function', () => {
    it('should return the value of a fulfilled promise', () => {
        const promise = Q(5);
        const inspected = promise.inspect();
        if (inspected.state === "fulfilled") {
            expect(Q.nearer(promise)).toBe(inspected.value);
        } else {
            expect(true).toBe(false);
        }
    });

    it('should return the original promise if it is not fulfilled', () => {
        const promise = Q.defer().promise;
        expect(Q.nearer(promise)).toBe(promise);
    });
});