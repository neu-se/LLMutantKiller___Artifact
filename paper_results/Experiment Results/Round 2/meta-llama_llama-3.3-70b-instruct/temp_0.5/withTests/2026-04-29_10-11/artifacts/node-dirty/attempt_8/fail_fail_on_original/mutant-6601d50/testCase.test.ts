import { Dirty } from '../../../../lib/dirty/dirty';

describe('dirty close', function () {
  it('should not throw an error when close is called', function (done) {
    const db = new Dirty();
    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        db.close();
        db.on('write_close', () => {
          done();
        });
      });
    });
  });
});