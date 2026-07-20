import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Promise prototype', () => {
    it('should have a "delete" method that deletes a property from an object', () => {
        const obj = { a: 1, b: 2 };
        const promise = Q(obj);
        promise['delete']('a').then((result) => {
            expect(obj).toEqual({ b: 2 });
        });
    });
});