import { Q } from "../../../../../q.js";

describe('Q.race', () => {
    it('should throw an error when no promises are provided and race function is empty', () => {
        const originalRace = Q.race;
        Q.race = function() {};
        expect(() => Q.race([])).toThrowError();
        Q.race = originalRace;
    });
});