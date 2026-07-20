import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when hasStacks is false', () => {
        const originalHasStacks = Q.hasStacks;
        Q.hasStacks = false;
        expect(() => captureLine()).toThrowError();
        Q.hasStacks = originalHasStacks;
    });
});