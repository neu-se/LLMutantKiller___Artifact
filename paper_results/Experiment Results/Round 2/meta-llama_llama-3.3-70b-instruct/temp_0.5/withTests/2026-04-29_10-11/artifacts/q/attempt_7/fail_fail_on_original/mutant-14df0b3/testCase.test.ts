import { Q } from "../../../q.js";

describe('Q', () => {
    it('Q["delete"] should be a function', () => {
        expect(typeof Q["delete"]).toBe('function');
    });
});