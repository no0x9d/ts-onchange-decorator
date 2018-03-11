import {OnChange} from '../src/on-change-decorator'
import {expect} from 'chai';

describe('onChange decorator', () => {
  describe('on property', () => {
    it('should call change handler if function is supplied', () => {

      let called = false;
      const changeHandler = (oldValue: string, newValue: string) => {
        expect(oldValue).to.be.equal(undefined);
        expect(newValue).to.be.equal('foo');
        called = true;
      };

      class SUT {
        @OnChange(changeHandler)
        field: string
      }

      const sut = new SUT();
      sut.field = 'foo';
      expect(sut.field).to.be.equal('foo');
      expect(called).to.be.true;
    });

    it('should call method if change handler as key is supplied', () => {
      let called = false;

      class SUT {
        @OnChange('handler')
        field: string;

        handler(oldValue: string, newValue: string) {
          expect(oldValue).to.be.equal(undefined);
          expect(newValue).to.be.equal('foo');
          called = true;
        }
      }

      const sut = new SUT();
      sut.field = 'foo';
      expect(sut.field).to.be.equal('foo');
      expect(called).to.be.true;
    });

    it('should call default change handler', () => {
      let called = false;

      class SUT {
        @OnChange()
        field: string;

        fieldChange(oldValue: string, newValue: string) {
          expect(oldValue).to.be.equal(undefined);
          expect(newValue).to.be.equal('foo');
          called = true;
        }
      }

      const sut = new SUT();
      sut.field = 'foo';
      expect(called).to.be.true;
    });

    it('should set internal backing field', () => {
      class SUT {
        @OnChange()
        field: string;
      }

      const sut = new SUT();
      sut.field = 'foo';
      expect((<any>sut)._field).to.be.equal('foo');
    });

    it('should set backing field', () => {
      class SUT {
        @OnChange(undefined, 'backingField')
        field: string;
      }

      const sut = new SUT();
      sut.field = 'foo';
      expect((<any>sut).backingField).to.be.equal('foo');
    })
  });
  describe('on accessor', () => {
    it('should call change handler if function is supplied', () => {

      let called = false;
      const changeHandler = (oldValue: string, newValue: string) => {
        expect(oldValue).to.be.equal(null);
        expect(newValue).to.be.equal('foo');
        called = true;
      };

      class SUT {
        @OnChange(changeHandler)
        set field(value: string) {
        }
      }

      const sut = new SUT();
      sut.field = 'foo';
      expect(called).to.be.true;
    });

    it('should call method if change handler as key is supplied', () => {
      let called = false;

      class SUT {
        @OnChange('handler')
        set field(value: string) {
        }

        handler(oldValue: string, newValue: string) {
          expect(oldValue).to.be.equal(null);
          expect(newValue).to.be.equal('foo');
          called = true;
        }
      }

      const sut = new SUT();
      sut.field = 'foo';
      expect(called).to.be.true;
    });

    it('should call default change handler', () => {
      let called = false;

      class SUT {
        @OnChange()
        set field(value: string) {
        }

        fieldChange(oldValue: string, newValue: string) {
          expect(oldValue).to.be.equal(null);
          expect(newValue).to.be.equal('foo');
          called = true;
        }
      }

      const sut = new SUT();
      sut.field = 'foo';
      expect(called).to.be.true;
    })
  })
});