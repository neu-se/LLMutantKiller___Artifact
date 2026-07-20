import { Q } from "../q.js";

describe('Q.race', () => {
    it('should not throw an error when called with an empty array', () => {
        expect(() => Q.race([])).not.toThrowError();
    });
});