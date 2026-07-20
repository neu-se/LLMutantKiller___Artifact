import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should return undefined when Q.keys is called with no arguments on the mutated code', () => {
        const result = Q.keys();
        expect(result).toBeUndefined();
    });
});