import { Q } from "../../../../../q.js";

describe('Q.race', () => {
    it('should throw an error when no promises are provided', () => {
        expect(() => Q.race([])).toThrowError();
    });
});