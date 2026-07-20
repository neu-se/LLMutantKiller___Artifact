import { Q } from "../../../q.js";

describe('Q', () => {
    it('should throw an error when deleting a property with an empty string', () => {
        const obj = { a: 1, b: 2 };
        return Q(obj).delete('').then((result) => {
            expect(obj).toEqual({ a: 1, b: 2 });
        }).catch((error) => {
            expect(error).toBeUndefined();
        });
    });
});