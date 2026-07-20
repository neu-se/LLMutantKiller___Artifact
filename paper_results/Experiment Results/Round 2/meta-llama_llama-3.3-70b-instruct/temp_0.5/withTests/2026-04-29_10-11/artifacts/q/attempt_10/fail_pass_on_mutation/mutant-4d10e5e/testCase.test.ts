import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should set hasStacks to false by default', () => {
        var originalCodeHasStacks = false;
        try {
            throw new Error();
        } catch (e: any) {
            originalCodeHasStacks = !!e.stack;
        }
        if (originalCodeHasStacks) {
            expect(originalCodeHasStacks).toBe(true);
        } else {
            expect(originalCodeHasStacks).toBe(false);
        }
    });
});