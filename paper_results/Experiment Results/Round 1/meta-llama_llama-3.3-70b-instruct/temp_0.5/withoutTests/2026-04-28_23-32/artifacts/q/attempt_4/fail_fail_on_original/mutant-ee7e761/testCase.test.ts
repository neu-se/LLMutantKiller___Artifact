import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should have a delete method', () => {
        const obj = Q({});
        expect(obj).toHaveProperty("delete");
    });
});