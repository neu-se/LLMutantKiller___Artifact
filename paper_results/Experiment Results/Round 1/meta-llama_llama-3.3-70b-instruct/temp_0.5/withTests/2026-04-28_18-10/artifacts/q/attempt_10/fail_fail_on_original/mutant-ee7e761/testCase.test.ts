import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Promise prototype', () => {
    it('should have a "delete" method that is a function and works as expected', () => {
        const obj = { a: 1, b: 2 };
        const promise = Q(obj);
        promise['delete']('a').then((result) => {
            expect(obj).toEqual({ b: 2 });
        });
    });
});