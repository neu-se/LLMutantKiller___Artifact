import { Q } from "../../../q.js";

describe('Q', () => {
    it('should return the correct keys for an object', () => {
        const obj = { a: 1, b: 2 };
        return Q(obj).keys().then((keys) => {
            expect(keys).toEqual(['a', 'b']);
        });
    });
});