import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.async', () => {
    it('should throw an error when the generator has an empty try block', () => {
        function* generator() {
            try {
            } catch (e) {
                throw e;
            }
            return 10;
        }

        const asyncGenerator = Q.async(generator);
        return asyncGenerator().then((result: any) => {
            expect(true).toBe(false);
        }).catch((error: any) => {
            expect(error).toBeInstanceOf(Error);
        });
    });
});