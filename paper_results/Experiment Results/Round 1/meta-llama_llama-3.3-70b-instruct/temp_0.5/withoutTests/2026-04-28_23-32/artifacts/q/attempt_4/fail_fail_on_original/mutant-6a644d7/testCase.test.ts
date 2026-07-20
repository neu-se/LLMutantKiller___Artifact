import { Q } from "../q.js";

describe('Q.race', () => {
    it('should throw an error when Q.race is called', () => {
        expect(() => Q.race()).toThrowError();
    });
});