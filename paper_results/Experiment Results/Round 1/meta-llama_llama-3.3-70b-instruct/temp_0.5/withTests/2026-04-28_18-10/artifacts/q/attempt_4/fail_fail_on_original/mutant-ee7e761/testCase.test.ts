import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Promise prototype', () => {
    it('should have a "delete" method', () => {
        const promise = Q({});
        expect(typeof promise['delete']).toBe('function');
    });
});