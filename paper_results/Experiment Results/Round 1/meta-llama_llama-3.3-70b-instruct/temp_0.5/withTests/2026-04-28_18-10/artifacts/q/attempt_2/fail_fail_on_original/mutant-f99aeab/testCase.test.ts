import { Q } from "../../../../../../../../subject_repositories/q/q.js"

describe('q', () => {
    it('should test the behavior of the mutated file', () => {
        const hasStacks = false;
        try {
            throw new Error();
        } catch (e) {
            hasStacks = !!e.stack;
        }
        if (hasStacks) {
            throw new Error('Expected hasStacks to be false');
        }
    });
});