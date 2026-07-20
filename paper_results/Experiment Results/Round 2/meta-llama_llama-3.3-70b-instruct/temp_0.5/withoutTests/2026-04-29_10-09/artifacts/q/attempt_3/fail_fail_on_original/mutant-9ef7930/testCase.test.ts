import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.race', () => {
    it('should throw an error when the input array is empty in the mutated code', () => {
        const promiseArray = [];
        expect(() => Q.race(promiseArray)).toThrowError();
    });
});