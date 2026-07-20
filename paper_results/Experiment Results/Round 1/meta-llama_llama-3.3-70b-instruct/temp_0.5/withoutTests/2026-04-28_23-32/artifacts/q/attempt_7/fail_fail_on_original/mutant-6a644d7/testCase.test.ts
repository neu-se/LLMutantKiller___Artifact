import { Q } from "../q.js";

describe('Q.race', () => {
    it('should throw an error when Q.race is called with a non-array argument', () => {
        expect(() => Q.race('string')).toThrowError();
    });
});