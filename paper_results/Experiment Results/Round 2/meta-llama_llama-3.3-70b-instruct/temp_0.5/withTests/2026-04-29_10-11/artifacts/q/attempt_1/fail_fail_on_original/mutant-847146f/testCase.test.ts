import { Q } from '../../../../../../../../subject_repositories/q/q';

describe('Q', () => {
    it('should throw an error when Q[""] is called', () => {
        expect(() => Q[""]()).toThrowError();
    });
});