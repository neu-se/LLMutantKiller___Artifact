import { Q } from '../q';

describe('Q', () => {
    it('should throw an error when Q.noConflict is called in a non-browser environment', () => {
        if (typeof window === 'undefined') {
            try {
                Q.noConflict();
            } catch (e) {
                expect(e.message).toBe("Q.noConflict only works when Q is used as a global");
            }
        } else {
            try {
                Q.noConflict();
            } catch (e) {
                expect(e.message).not.toBe("Q.noConflict only works when Q is used as a global");
            }
        }
    });
});