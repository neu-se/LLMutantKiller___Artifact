import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should have a delete method named "delete"', () => {
        const obj = Q({});
        expect(Object.prototype.hasOwnProperty.call(obj, 'delete')).toBe(true);
    });
});