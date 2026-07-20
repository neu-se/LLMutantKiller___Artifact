import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should have a delete method with the correct name', () => {
        const obj = Q({});
        expect(Object.keys(obj)).toContain("delete");
    });
});