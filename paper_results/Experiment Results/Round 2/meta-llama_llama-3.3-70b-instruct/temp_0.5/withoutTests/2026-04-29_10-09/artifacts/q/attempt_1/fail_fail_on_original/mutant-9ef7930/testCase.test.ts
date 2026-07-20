import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q.race', () => {
    it('should reject with an error when the input array is empty', () => {
        expect.assertions(1);
        return Q.race([]).catch((error: any) => {
            expect(error.message).toBe('Can\'t do then on undefined');
        });
    });
});