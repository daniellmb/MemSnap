/**
 * @file
 *
 * ### Responsibilities
 * - unit test memSnap.js
 *
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */
'use strict';

/*global memSnap*/
describe('memSnap.js', function () {
  beforeEach(function () {
    // add spies
  });

  it('should have a working test harness', function () {
    // arrange
    // act
    // assert
    expect(true).not.toBe(false);
  });

  it('should exist', function () {
    // arrange
    // act
    // assert
    expect(typeof memSnap).toBe('function');
  });

  describe('start', function () {
    var win, url;
    beforeEach(function () {
      // set logging url
      url = 'http://example.com/log/?when={lbl}&limit={lmt}&total={tot}&usage={use}';
      // mock the global context
      win = {
        performance: { memory: {} },
        setTimeout: jasmine.createSpy('setTimeout')
      };
    });

    it('should check for browser support', function () {
      // arrange
      win.performance.memory = undefined;
      // actgy
      memSnap(win);
      // assert
      expect(win.setTimeout).not.toHaveBeenCalled();
    });

    it('should schedule sending memory stats', function () {
      // arrange
      // act
      memSnap(win, url);
      // assert
      expect(win.setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 1728e5);
      expect(win.setTimeout.calls.count()).toBe(11);
    });

    it('should support custom intervals', function () {
      // arrange
      // act
      memSnap(win, url, {
        'bar': 123,
        'baz': 321
      });
      // assert
      expect(win.setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 123);
      expect(win.setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 321);
      expect(win.setTimeout.calls.count()).toBe(2);
    });

    it('should exclude inherited properties', function () {
      // arrange
      var intervals = {
        'bar': 123,
        'baz': 321
      };
      Object.prototype.foo = 'bar';
      // act
      memSnap(win, url, intervals);
      // assert
      expect(win.setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 123);
      expect(win.setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 321);
      expect(win.setTimeout).not.toHaveBeenCalledWith(jasmine.any(Function), 'bar');
      expect(win.setTimeout.calls.count()).toBe(2);
      // clean up
      delete Object.prototype.foo;
    });

    describe('sendAt', function () {
      var img;
      beforeEach(function () {
        // mock creating an image
        img = {};
        // extend the global context mock (above)
        win.performance.memory = {
          jsHeapSizeLimit: 1,
          totalJSHeapSize: 2,
          usedJSHeapSize: 3
        };
        win.document = {
          createElement: jasmine.createSpy('createElement').and.returnValue(img)
        };
        win.encodeURIComponent = jasmine.createSpy('encodeURIComponent').and.returnValue('encodeURIComponent');
      });

      it('should create an image with the data', function () {
        // arrange
        memSnap(win, url, {
          't&c': 1337,
          'foo': 321
        });
        var sendAt = win.setTimeout.calls.argsFor(0)[0],
            expected = 'http://example.com/log/?when=encodeURIComponent&limit=1&total=2&usage=3';
        // act
        sendAt();
        // assert
        expect(win.document.createElement).toHaveBeenCalledWith('img');
        expect(win.encodeURIComponent).toHaveBeenCalledWith('t&c');
        expect(img.src).toBe(expected);
      });

    });

  });

});