import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.race', () => {
    it('should not throw an error when the input array has one element', () => {
        const promise = Q.delay(10);
        expect(() => Q.race([promise])).not.toThrowError();
    });
});