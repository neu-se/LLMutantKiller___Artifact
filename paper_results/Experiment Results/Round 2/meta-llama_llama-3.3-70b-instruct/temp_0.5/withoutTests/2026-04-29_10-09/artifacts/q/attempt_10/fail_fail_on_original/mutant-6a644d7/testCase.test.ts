import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.race', () => {
    it('should throw an error when the race function is empty', () => {
        const originalRace = Q.race;
        Q.race = function() {};
        expect(() => Q.race([Q.resolve(1), Q.resolve(2)])).toThrowError();
        Q.race = originalRace;
    });
});