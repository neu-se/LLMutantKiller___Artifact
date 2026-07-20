import { Promise } from '../../../../../../../../subject_repositories/q/q';

describe('Promise', () => {
    it('should return the correct keys for an object', () => {
        const obj = { a: 1, b: 2 };
        return Promise.keys(obj).then((keys) => {
            expect(keys).toEqual(['a', 'b']);
        });
    });
});