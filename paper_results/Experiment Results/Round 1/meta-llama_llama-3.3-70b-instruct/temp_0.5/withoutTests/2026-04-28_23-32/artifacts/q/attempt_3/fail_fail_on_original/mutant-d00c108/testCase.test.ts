import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.race function', () => {
    it('should throw an error when called without arguments', () => {
        expect(() => Q.race()).toThrowError();
    });
});