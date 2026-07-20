import { Q } from "../../../q.js";

describe('Q.async', () => {
    it('should resolve with the correct value', () => {
        const asyncFunction = Q.async(function* () {
            yield Q.resolve(1);
            return 2;
        });

        return expect(asyncFunction()).resolves.toBe(2);
    });
});