import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.async', () => {
    it('should throw an error when the generator is empty', () => {
        function* generator() {
            try {
            } catch (e) {
                throw e;
            }
        }

        const asyncGenerator = Q.async(generator);
        return asyncGenerator().then((result: any) => {
            expect(true).toBe(false);
        }).catch((error: any) => {
            expect(error).toBeInstanceOf(Error);
        });
    });
});