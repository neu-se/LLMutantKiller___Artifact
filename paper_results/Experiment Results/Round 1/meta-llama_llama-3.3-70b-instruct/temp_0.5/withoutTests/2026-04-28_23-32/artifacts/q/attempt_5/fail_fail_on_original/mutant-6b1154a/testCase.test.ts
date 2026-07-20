import { Q } from '../../q';

describe('Q promise library', () => {
    it('should handle done method correctly', () => {
        var promise = Q(true);
        var fulfilled = false;
        var rejected = false;
        promise.done(
            () => { fulfilled = true; },
            () => { rejected = true; }
        );
        expect(fulfilled).toBe(true);
        expect(rejected).toBe(false);
    });
});