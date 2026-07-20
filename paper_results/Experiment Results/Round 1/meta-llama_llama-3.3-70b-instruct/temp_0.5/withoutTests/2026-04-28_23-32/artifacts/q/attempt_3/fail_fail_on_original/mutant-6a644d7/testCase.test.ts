import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.race', () => {
    it('should throw an error when Q.race is called with an empty array', () => {
        expect(() => Q.race([])).toThrowError();
    });
});