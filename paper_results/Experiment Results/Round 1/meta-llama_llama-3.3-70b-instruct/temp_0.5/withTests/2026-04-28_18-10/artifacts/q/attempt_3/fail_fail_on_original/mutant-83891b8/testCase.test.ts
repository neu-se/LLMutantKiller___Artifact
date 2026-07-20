import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q function', () => {
    it('should return the inspected value of a fulfilled promise', () => {
        const promise = Q(5);
        const inspected = promise.inspect();
        if (inspected.state === "fulfilled") {
            expect(inspected.value).toBe(5);
        } else {
            expect(true).toBe(false);
        }
    });

    it('should not return the inspected value of a rejected promise', () => {
        const promise = Q.reject(5);
        const inspected = promise.inspect();
        if (inspected.state === "fulfilled") {
            expect(true).toBe(false);
        } else {
            expect(inspected.reason).toBe(5);
        }
    });
});