import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.race', () => {
    it('should return undefined when called with no arguments in the mutated code', () => {
        const result = Q.race();
        expect(result).toBeUndefined();
    });
});