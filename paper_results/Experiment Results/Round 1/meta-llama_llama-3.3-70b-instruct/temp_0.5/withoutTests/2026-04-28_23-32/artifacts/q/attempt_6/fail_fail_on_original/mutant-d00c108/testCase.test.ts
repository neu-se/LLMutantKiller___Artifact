import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.race function', () => {
    it('should throw an error when called with an empty array', () => {
        expect(() => Q.race([])).toThrowError();
    });
});