import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should throw an error with a specific message when trying to denodeify an undefined function', () => {
        let errorMessage: string | undefined;
        try {
            Q.denodeify(undefined);
        } catch (e: any) {
            errorMessage = e.message;
        }
        expect(errorMessage).toBe("Q can't wrap an undefined function");
    });
});