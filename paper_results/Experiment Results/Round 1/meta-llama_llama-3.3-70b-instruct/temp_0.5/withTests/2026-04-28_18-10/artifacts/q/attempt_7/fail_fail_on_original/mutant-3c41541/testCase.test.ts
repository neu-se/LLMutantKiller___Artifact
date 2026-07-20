import { Q } from "../../../q.js";

describe('Q', () => {
    it('should throw an error when deleting a property with an empty string', () => {
        const obj = { a: 1, b: 2 };
        expect(() => Q(obj).delete('')).toThrowError();
    });
});