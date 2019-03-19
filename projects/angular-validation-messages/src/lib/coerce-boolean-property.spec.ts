import { coerceBooleanProperty } from './coerce-boolean-property';

describe('coerceBooleanProperty', () => {
  describe('returns false', () => {
    it('when passed null', () => {
      expect(coerceBooleanProperty(null)).toEqual(false);
    });

    it('when passed undefined', () => {
      expect(coerceBooleanProperty(undefined)).toEqual(false);
    });

    it('when passed false as a boolean', () => {
      expect(coerceBooleanProperty(false)).toEqual(false);
    });

    it('when passed false as a string', () => {
      expect(coerceBooleanProperty('false')).toEqual(false);
    });
  });

  describe('returns true', () => {
    it('when passed an object', () => {
      expect(coerceBooleanProperty({})).toEqual(true);
    });

    it('when passed true as a boolean', () => {
      expect(coerceBooleanProperty(true)).toEqual(true);
    });

    it('when passed true as a string', () => {
      expect(coerceBooleanProperty('true')).toEqual(true);
    });

    it('when passed an empty string', () => {
      expect(coerceBooleanProperty('')).toEqual(true);
    });
  });
});
