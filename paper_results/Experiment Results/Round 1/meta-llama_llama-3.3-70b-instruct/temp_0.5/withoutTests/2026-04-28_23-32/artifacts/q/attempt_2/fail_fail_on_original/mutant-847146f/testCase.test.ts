import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should have a "catch" property with the correct name', () => {
        expect(Object.keys(Q)).toContain('catch');
    });
});