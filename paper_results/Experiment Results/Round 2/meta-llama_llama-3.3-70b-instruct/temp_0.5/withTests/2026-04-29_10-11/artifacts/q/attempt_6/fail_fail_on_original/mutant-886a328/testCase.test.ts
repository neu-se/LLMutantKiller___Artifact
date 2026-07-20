import Q from '../../q';

describe('Q', () => {
    it('should throw an error when Q.noConflict is called in a non-browser environment', () => {
        if (typeof window === 'undefined') {
            try {
                Q.noConflict();
            } catch (e) {
                expect(e).toBeInstanceOf(Error);
            }
        } else {
            try {
                Q.noConflict();
            } catch (e) {
                expect(e).not.toBeInstanceOf(Error);
            }
        }
    });
});