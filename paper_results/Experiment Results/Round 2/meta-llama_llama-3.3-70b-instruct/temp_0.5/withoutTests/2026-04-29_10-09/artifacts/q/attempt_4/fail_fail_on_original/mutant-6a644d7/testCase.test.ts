import { Q } from "../../../../../q.js";

describe('Q.race', () => {
    it('should throw an error when the function does not return a promise', () => {
        const originalRace = Q.race;
        Q.race = function() {};
        expect(() => Q.race([Q.resolve(1)])).toThrowError();
        Q.race = originalRace;
    });
});