import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when Q.noConflict is called', () => {
        expect(() => (Q as any).noConflict()).toThrow();
    });
});