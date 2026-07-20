import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not throw an error when hasStacks is true', () => {
        const originalHasStacks = Q.hasStacks;
        Q.hasStacks = true;
        expect(() => captureLine()).not.toThrowError();
        Q.hasStacks = originalHasStacks;
    });
});