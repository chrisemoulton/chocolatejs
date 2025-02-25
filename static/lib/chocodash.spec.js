// Generated by CoffeeScript 1.9.2
(function() {
  var Observer, Publisher, Signal, _;

  _ = require('../general/chocodash');

  xdescribe('prototype', function() {
    var CopiedDocument, DocWithCons, DocWithInst, Document, InheritedDocument, cop, doc, inh;
    Document = _.prototype();
    DocWithCons = DocWithInst = null;
    doc = null;
    it('should create a basic Prototype', function() {
      expect(Document.use).not.toBe(void 0);
      return expect(new Document instanceof Document).toBeTruthy();
    });
    it('should create a Prototype with a constructor', function() {
      var dwc;
      DocWithCons = _.prototype({
        constructor: function(name1) {
          this.name = name1;
        }
      });
      dwc = new DocWithCons("MyDoc");
      return expect(dwc.name).toBe("MyDoc");
    });
    it('should create a Prototype with an instance function', function() {
      var dwi;
      DocWithInst = _.prototype({
        add: function(a, b) {
          return a + b;
        },
        sub: function(a, b) {
          return a - b;
        }
      });
      dwi = new DocWithInst;
      return expect(dwi.add(1, 1)).toBe(2);
    });
    it('allows a Prototype to use some functions', function() {
      Document.use(function() {
        this.add = function(a, b) {
          return a + b;
        };
        return this.sub = function(a, b) {
          return a - b;
        };
      });
      doc = new Document;
      expect(doc.add(1, 1)).toBe(2);
      return expect(doc.sub(1, 1)).toBe(0);
    });
    CopiedDocument = null;
    cop = null;
    it('should create a Prototype by adopting another prototype and using functions', function() {
      var MoreMath;
      MoreMath = function() {
        this.multiply = function(a, b) {
          return a * b;
        };
        return this.divide = function(a, b) {
          return a / b;
        };
      };
      CopiedDocument = _.prototype({
        adopt: Document,
        use: MoreMath
      });
      cop = new CopiedDocument;
      expect(cop.add(2, 2)).toBe(4);
      expect(cop.multiply(3, 3)).toBe(9);
      return expect(cop.divide(3, 3)).toBe(1);
    });
    InheritedDocument = null;
    inh = null;
    it('should create a Prototype by inheriting from another prototype', function() {
      InheritedDocument = _.prototype({
        inherit: Document,
        use: function() {
          return this.sub = function(a, b) {
            return a + ' - ' + b + ' = ' + _["super"](this, a, b);
          };
        }
      });
      inh = new InheritedDocument;
      return expect(inh.add(2, 2)).toBe(4);
    });
    it('makes an inherited Prototype access its parent functions if superseeded', function() {
      return expect(inh.sub(2, 2)).toBe("2 - 2 = 0");
    });
    it('should create a Prototype by inheriting from another prototype with a constructor', function() {
      var InheritedDocWithCons, idwc;
      InheritedDocWithCons = _.prototype({
        inherit: DocWithCons
      });
      idwc = new InheritedDocWithCons("MyDoc");
      return expect(idwc.name).toBe("MyDoc");
    });
    it('should create a Prototype with a constructor by inheriting from another prototype with a constructor', function() {
      var InheritedDocWithCons, idwc;
      InheritedDocWithCons = _.prototype({
        inherit: DocWithCons,
        constructor: function(name) {
          return this.name += name;
        }
      });
      idwc = new InheritedDocWithCons("MyDoc");
      expect(idwc.name).toBe("MyDocMyDoc");
      InheritedDocWithCons = _.prototype({
        inherit: DocWithCons,
        constructor: function(name) {
          return _["super"](this, this.name + ' is ' + name);
        }
      });
      idwc = new InheritedDocWithCons("MyDoc");
      return expect(idwc.name).toBe("MyDoc is MyDoc");
    });
    it('should create a Prototype by inheriting from another prototype and acccess parent\'s instance function', function() {
      var InheritedDocWithInst, idwi;
      InheritedDocWithInst = _.prototype({
        inherit: DocWithInst
      }, {
        add: function(a, b) {
          return a + " + " + b + " = " + _["super"](this, a, b);
        }
      });
      InheritedDocWithInst.use(function() {
        return this.sub = function(a, b) {
          return a + " - " + b + " = " + _["super"](this, a, b);
        };
      });
      idwi = new InheritedDocWithInst;
      expect(idwi.add(2, 3)).toBe("2 + 3 = 5");
      return expect(idwi.sub(2, 2)).toBe("2 - 2 = 0");
    });
    it('allows a copied Prototype to be independant from its model', function() {
      Document.prototype.add = function(a, b) {
        return a + " " + b;
      };
      expect(doc.add(2, 2)).toBe("2 2");
      return expect(cop.add(2, 2)).toBe(4);
    });
    return it('makes an inherited Prototype dependant of its model', function() {
      return expect(inh.add(2, 2)).toBe("2 2");
    });
  });

  xdescribe('Data', function() {
    return describe('Serialization services', function() {
      var o, s;
      o = {
        u: void 0,
        n: null,
        i: 1,
        f: 1.11,
        s: '2',
        b: true,
        add: function(a, b) {
          return a + b;
        },
        d: new Date("Sat Jan 01 2011 00:00:00 GMT+0100")
      };
      s = '';
      it('should stringify an object', function() {
        return expect(s = _.stringify(o)).toBe("{u:void 0,n:null,i:1,f:1.11,s:'2',b:true,add:function (a, b) {\n          return a + b;\n        },d:new Date(1293836400000)}");
      });
      it('should parse a string to an object', function() {
        var a;
        a = _.parse(s);
        expect(a.u).toBe(void 0);
        expect(a.n).toBe(null);
        expect(a.i).toBe(1);
        expect(a.f).toBe(1.11);
        expect(a.s).toBe('2');
        expect(a.b).toBe(true);
        expect(a.add(1, 1)).toBe(2);
        return expect(a.d.valueOf()).toBe(new Date("Sat Jan 01 2011 00:00:00 GMT+0100").valueOf());
      });
      return it('should convert an object to url query parameters', function() {
        var a;
        a = _.param({
          u: 1,
          v: 2
        });
        return expect(a).toBe('u=1&v=2');
      });
    });
  });

  describe('Flow', function() {
    var f1, f2, f3;
    f1 = function(cb) {
      return setTimeout((function() {
        return cb(new Date().getTime());
      }), 250);
    };
    f2 = function(cb) {
      return setTimeout((function() {
        return cb(new Date().getTime());
      }), 150);
    };
    f3 = function(cb) {
      return setTimeout((function() {
        return cb(new Date().getTime());
      }), 350);
    };
    it('should not serialize three async functions without _.serialize', function() {
      var start, time1, time2, time3;
      start = new Date().getTime();
      time1 = time2 = time3 = null;
      runs(function() {
        f1(function(time) {
          return time1 = time;
        });
        f2(function(time) {
          return time2 = time;
        });
        return f3(function(time) {
          return time3 = time;
        });
      });
      waitsFor((function() {
        return (time1 != null) && (time2 != null) && (time3 != null);
      }), 'serial call of f1(), f2() and f3()', 1000);
      return runs(function() {
        expect(time1 - start).toBeGreaterThan(250 - 10);
        expect(time2 - start).toBeLessThan(150 + 10);
        return expect(time3 - start).toBeLessThan(350 + 10);
      });
    });
    it('should serialize three async functions with _.serialize', function() {
      var data, end, start, time1, time2, time3;
      start = new Date().getTime();
      time1 = time2 = time3 = end = null;
      data = {
        sum: 0
      };
      runs(function() {
        _.serialize({
          local: data
        }, function(defer, local) {
          defer(function(next) {
            return f1(function(time) {
              time1 = time;
              local.sum += 1;
              return next();
            });
          });
          defer(function(next) {
            return f2(function(time) {
              time2 = time;
              local.sum += 1;
              return next();
            });
          });
          return defer(function(next) {
            return f3(function(time) {
              time3 = time;
              local.sum += 1;
              return next();
            });
          });
        });
        return end = new Date().getTime();
      });
      waitsFor((function() {
        return (time1 != null) && (time2 != null) && (time3 != null);
      }), '_.serialize()', 1000);
      return runs(function() {
        expect(time1 - start).toBeGreaterThan(250 - 5);
        expect(time2 - start).toBeGreaterThan(400 - 5);
        expect(time3 - start).toBeGreaterThan(750 - 5);
        expect(end - start).toBeLessThan(10);
        return expect(data.sum).toBe(3);
      });
    });
    it('should serialize three async functions with _.flow', function() {
      var data, end, start, time1, time2, time3;
      start = new Date().getTime();
      time1 = time2 = time3 = end = null;
      data = {
        sum: 0
      };
      runs(function() {
        _.flow(function(run) {
          run(function(end) {
            return f1((function(_this) {
              return function(time) {
                time1 = time;
                data.sum += 1;
                return end();
              };
            })(this));
          });
          run(function(end) {
            return f2(function(time) {
              time2 = time;
              data.sum += 1;
              return end();
            });
          });
          run(function(end) {
            return end();
          });
          return run(function(end) {
            return f3((function(_this) {
              return function(time) {
                time3 = time;
                data.sum += 1;
                return end();
              };
            })(this));
          });
        });
        return end = new Date().getTime();
      });
      waitsFor((function() {
        return (time1 != null) && (time2 != null) && (time3 != null);
      }), '_.flow()', 1000);
      return runs(function() {
        expect(time1 - start).toBeGreaterThan(250 - 5);
        expect(time2 - start).toBeGreaterThan(400 - 5);
        expect(time3 - start).toBeGreaterThan(750 - 5);
        expect(end - start).toBeLessThan(10);
        return expect(data.sum).toBe(3);
      });
    });
    it('should serialize synced tasks as asynced code', function() {
      var i, j;
      i = 0;
      j = false;
      runs(function() {
        _.flow(function(run) {
          run(function(end) {
            i++;
            return end();
          });
          run(function(end) {
            i++;
            return end();
          });
          return run(function() {
            i++;
            return j = true;
          });
        });
        return expect(i).toBe(2);
      });
      waitsFor((function() {
        return j === true;
      }), '_.flow()', 1000);
      return runs(function() {
        return expect(i).toBe(3);
      });
    });
    it('should serialize sync functions as sync code', function() {
      var i;
      i = 0;
      _.flow({
        async: false
      }, function(run) {
        run(function(end) {
          i++;
          return end();
        });
        run(function(end) {
          i++;
          return end();
        });
        return run(function() {
          return i++;
        });
      });
      return expect(i).toBe(3);
    });
    it('should serialize synced and asynced functions', function() {
      var i, j, k, l;
      i = 0;
      j = false;
      k = false;
      l = false;
      runs(function() {
        _.flow(function(run) {
          run(function(end) {
            i++;
            return end();
          });
          run(function(end) {
            setTimeout((function() {
              i++;
              j = true;
              return end();
            }), 150);
            return end.later;
          });
          run(function(end) {
            i++;
            return end();
          });
          run(function(end) {
            return setTimeout((function() {
              i++;
              k = true;
              return end();
            }), 150);
          });
          run(function(end) {
            i++;
            return end();
          });
          run(function(end) {
            i++;
            return end();
          });
          return run(function(end) {
            return setTimeout((function() {
              i++;
              l = true;
              return task.done();
            }), 150);
          });
        });
        return expect(i).toBe(1);
      });
      waitsFor((function() {
        return j === true && k === true && l === true;
      }), '_.flow()', 1000);
      return runs(function() {
        return expect(i).toBe(7);
      });
    });
    it("_.parallelize and join after completion", function() {
      var end, m, next, nop_count, ref, start, time1, time1M, time2, time3;
      nop_count = 1000000;
      time1M = new Date().getTime();
      for (m = 0, ref = nop_count; 0 <= ref ? m < ref : m > ref; 0 <= ref ? m++ : m--) {
        0;
      }
      time1M = new Date().getTime() - time1M;
      start = new Date().getTime();
      time1 = time2 = time3 = next = end = null;
      runs(function() {
        _.parallelize(function(push, join) {
          push(function() {
            var n, ref1, results;
            results = [];
            for (n = 0, ref1 = nop_count; 0 <= ref1 ? n < ref1 : n > ref1; 0 <= ref1 ? n++ : n--) {
              0;
              results.push(time1 = new Date().getTime());
            }
            return results;
          });
          push(function() {
            var n, ref1, results;
            results = [];
            for (n = 0, ref1 = nop_count; 0 <= ref1 ? n < ref1 : n > ref1; 0 <= ref1 ? n++ : n--) {
              0;
              results.push(time2 = new Date().getTime());
            }
            return results;
          });
          push(function() {
            var n, ref1, results;
            results = [];
            for (n = 0, ref1 = nop_count; 0 <= ref1 ? n < ref1 : n > ref1; 0 <= ref1 ? n++ : n--) {
              0;
              results.push(time3 = new Date().getTime());
            }
            return results;
          });
          return join(function() {
            return end = new Date().getTime();
          });
        });
        return next = new Date().getTime();
      });
      waitsFor((function() {
        return (time1 != null) && (time2 != null) && (time3 != null);
      }), '_.parallelize()', 1000);
      return runs(function() {
        expect(time1M).toBeGreaterThan(2);
        expect(end - start).toBeGreaterThan(3 * time1M - 1);
        return expect(next - start).toBeLessThan(4);
      });
    });
    return xit("_.throttle a function call once in 300ms", function() {
      var count, max, start, summed, throttled, waited;
      max = 300;
      waited = 0;
      summed = 0;
      count = 0;
      start = new Date().getTime();
      throttled = _.throttle({
        wait: max,
        accumulate: true,
        reset: true
      }, function() {
        var args, end, len, m, value;
        end = new Date().getTime();
        waited += end - start;
        start = end;
        for (m = 0, len = arguments.length; m < len; m++) {
          args = arguments[m];
          value = args[0];
          summed += value;
        }
        return count += 1;
      });
      runs(function() {
        var i, m;
        for (i = m = 1; m <= 10; i = ++m) {
          throttled(i);
        }
      });
      waitsFor((function() {
        return count === 1;
      }), '_.throttle()', 1000);
      return runs(function() {
        expect(waited).toBeGreaterThan(1 * max - 1);
        return expect(summed).toBe(55);
      });
    });
  });

  xdescribe('extend', function() {
    it('should set values', function() {
      var o;
      o = _.extend({}, {
        first: 1
      });
      return expect(o.first).toBe(1);
    });
    it('should overwrite values if already set', function() {
      var o;
      o = _.extend({
        first: 1
      }, {
        first: 2
      });
      return expect(o.first).toBe(2);
    });
    it('should not overwrite values if already set and overwrite paramater set to false', function() {
      var o;
      o = _.extend({
        first: 1
      }, {
        first: 2
      }, false);
      return expect(o.first).toBe(1);
    });
    it('should overwrite values and preserve other values', function() {
      var o;
      o = _.extend({
        second: {
          sub: 'sub'
        }
      }, {
        first: 2,
        second: {
          sub: 'newsub'
        }
      });
      expect(o.first).toBe(2);
      return expect(o.second.sub).toBe('newsub');
    });
    return it('should set default values on sub-object if not set and preserve other values', function() {
      var o;
      o = _.extend({
        second: {
          suba: 'suba'
        }
      }, {
        first: 2,
        second: {
          suba: 'subaa',
          subb: 'subb'
        }
      }, false);
      expect(o.first).toBe(2);
      expect(o.second.suba).toBe('suba');
      return expect(o.second.subb).toBe('subb');
    });
  });

  xdescribe('defaults', function() {
    it('should set default values if not set', function() {
      var o;
      o = _.defaults({}, {
        first: 1
      });
      return expect(o.first).toBe(1);
    });
    it('should not set default values if already set', function() {
      var o;
      o = _.defaults({
        first: 1
      }, {
        first: 2
      });
      return expect(o.first).toBe(1);
    });
    it('should set default values if not set and preserve other values', function() {
      var o;
      o = _.defaults({
        second: {
          sub: 'sub'
        }
      }, {
        first: 2,
        second: {
          sub: 'newsub'
        }
      });
      expect(o.first).toBe(2);
      return expect(o.second.sub).toBe('sub');
    });
    return it('should set default values on sub-object if not set and preserve other values', function() {
      var o;
      o = _.defaults({
        second: {
          suba: 'suba'
        }
      }, {
        first: 2,
        second: {
          subb: 'subb'
        }
      });
      expect(o.first).toBe(2);
      expect(o.second.suba).toBe('suba');
      return expect(o.second.subb).toBe('subb');
    });
  });

  xdescribe('Actors', function() {
    it('should identify a JS object', function() {
      var o, ref, ref1, ref2, ref3;
      o = {
        first: 1,
        sub: {
          second: 2
        }
      };
      _["do"].identify(o);
      expect(_.Uuid.isUuid((ref = o._) != null ? (ref1 = ref.first) != null ? ref1.uuid : void 0 : void 0)).toBe(true);
      return expect(_.Uuid.isUuid((ref2 = o.sub._) != null ? (ref3 = ref2.second) != null ? ref3.uuid : void 0 : void 0)).toBe(true);
    });
    it('should set a value in an object passing an object', function() {
      var o;
      _["do"].identify(o = {
        first: 1
      });
      _["do"].set(o, {
        first: 2,
        second: 3
      });
      expect(o.first).toBe(2);
      return expect(o.second).toBe(3);
    });
    it('should set a value in an object passing a name and a value', function() {
      var o;
      o = {
        first: 1
      };
      _["do"].set(o, 'second', 2);
      return expect(o.second).toBe(2);
    });
    it('should set a value in an array passing an object', function() {
      var o;
      o = {
        first: 1,
        letters: ['a', 'b', 'c']
      };
      _["do"].set(o.letters, {
        '1': 'd',
        '0': 'e'
      });
      expect(o.letters[0]).toBe('e');
      expect(o.letters[1]).toBe('d');
      return expect(o.letters[2]).toBe('c');
    });
    return it('should set a value in an array passing an index and a value', function() {
      var o;
      o = {
        first: 1,
        letters: ['a', 'b', 'c']
      };
      _["do"].set(o.letters, 1, 'f');
      return expect(o.letters[1]).toBe('f');
    });
  });

  Signal = _.Signal, Observer = _.Observer, Publisher = _.Publisher;

  xdescribe('Signal', function() {
    it('Signal is a Signal', function() {
      var a;
      a = new Signal(1);
      return expect(a instanceof Signal).toBe(true);
    });
    it('Signal propagates on Signal but not on functions', function() {
      var a, b, c, d, e;
      a = new Signal(1);
      c = 0;
      b = function() {
        return c = a.value();
      };
      b();
      e = 0;
      d = new Signal(function() {
        return e = a.value();
      });
      expect(c).toBe(1);
      expect(e).toBe(1);
      a.value(2);
      expect(c).toBe(1);
      return expect(e).toBe(2);
    });
    it('Single static signal', function() {
      var a;
      a = new Signal(1);
      expect(a.value()).toEqual(1);
      expect(a.value(2)).toEqual(2);
      expect(a.value()).toEqual(2);
      expect(a.value(3)).toEqual(3);
      return expect(a.value()).toEqual(3);
    });
    it('Second static signal', function() {
      var a, b;
      a = new Signal(1);
      b = new Signal(2);
      expect(a.value()).toEqual(1);
      expect(b.value()).toEqual(2);
      expect(a.value()).toEqual(1);
      expect(b.value(3)).toEqual(3);
      expect(a.value()).toEqual(1);
      expect(b.value()).toEqual(3);
      expect(a.value()).toEqual(1);
      expect(b.value(4)).toEqual(4);
      expect(a.value()).toEqual(1);
      return expect(b.value()).toEqual(4);
    });
    it("Signal with simple single dependency", function() {
      var a, b, c;
      a = new Signal(1);
      b = new Signal(function() {
        return a.value();
      });
      expect(a.value()).toEqual(1);
      expect(b.value()).toEqual(1);
      a.value(2);
      expect(a.value()).toEqual(2);
      expect(b.value()).toEqual(2);
      c = new Signal(3);
      expect(a.value()).toEqual(2);
      return expect(b.value()).toEqual(2);
    });
    it("multi dependents", function() {
      var a, b, c;
      a = new Signal(1);
      b = new Signal(function() {
        return a.value();
      });
      c = new Signal(function() {
        return a.value() + 1;
      });
      expect(a.value()).toEqual(1);
      expect(b.value()).toEqual(1);
      expect(c.value()).toEqual(2);
      a.value(2);
      expect(a.value()).toEqual(2);
      expect(b.value()).toEqual(2);
      return expect(c.value()).toEqual(3);
    });
    it("Breaking dependency", function() {
      var a, b;
      a = new Signal(1);
      b = new Signal(function() {
        return a.value();
      });
      expect(a.value()).toEqual(1);
      expect(b.value()).toEqual(1);
      a.value(2);
      expect(a.value()).toEqual(2);
      expect(b.value()).toEqual(2);
      b.value(3);
      expect(a.value()).toEqual(2);
      expect(b.value()).toEqual(3);
      a.value(7);
      expect(a.value()).toEqual(7);
      return expect(b.value()).toEqual(3);
    });
    it("Signal with modified single dependency", function() {
      var a, b;
      a = new Signal(1);
      b = new Signal(function() {
        return a.value() + 10;
      });
      expect(a.value()).toEqual(1);
      expect(b.value()).toEqual(11);
      a.value(2);
      expect(a.value()).toEqual(2);
      return expect(b.value()).toEqual(12);
    });
    it("Signal with simple chain dependency", function() {
      var a, b, c;
      a = new Signal(1);
      b = new Signal(function() {
        return a.value();
      });
      c = new Signal(function() {
        return b.value();
      });
      expect(a.value()).toEqual(1);
      expect(b.value()).toEqual(1);
      expect(c.value()).toEqual(1);
      a.value(2);
      expect(a.value()).toEqual(2);
      expect(b.value()).toEqual(2);
      return expect(c.value()).toEqual(2);
    });
    it("Signal with complex chain dependency", function() {
      var a, b, c;
      a = new Signal(1);
      b = new Signal(function() {
        return a.value() + 1;
      });
      c = new Signal(function() {
        return b.value() + 1;
      });
      expect(a.value()).toEqual(1);
      expect(b.value()).toEqual(2);
      expect(c.value()).toEqual(3);
      a.value(4);
      expect(a.value()).toEqual(4);
      expect(b.value()).toEqual(5);
      return expect(c.value()).toEqual(6);
    });
    it("Signal with multiple dependency", function() {
      var a, b, c;
      a = new Signal(1);
      b = new Signal(2);
      c = new Signal(function() {
        return a.value() + b.value();
      });
      expect(a.value()).toEqual(1);
      expect(b.value()).toEqual(2);
      expect(c.value()).toEqual(3);
      a.value(3);
      expect(a.value()).toEqual(3);
      expect(b.value()).toEqual(2);
      expect(c.value()).toEqual(5);
      b.value(4);
      expect(a.value()).toEqual(3);
      expect(b.value()).toEqual(4);
      return expect(c.value()).toEqual(7);
    });
    it("Multipath dependencies", function() {
      var a, b, c;
      a = new Signal(1);
      b = new Signal(function() {
        return a.value() + 1;
      });
      c = new Signal(function() {
        return a.value() + b.value();
      });
      expect(a.value()).toEqual(1);
      expect(b.value()).toEqual(2);
      expect(c.value()).toEqual(3);
      a.value(7);
      expect(a.value()).toEqual(7);
      expect(b.value()).toEqual(8);
      expect(c.value()).toEqual(15);
      b.value(3);
      expect(a.value()).toEqual(7);
      expect(b.value()).toEqual(3);
      expect(c.value()).toEqual(10);
      a.value(4);
      expect(a.value()).toEqual(4);
      expect(b.value()).toEqual(3);
      return expect(c.value()).toEqual(7);
    });
    it("avoid redundant multipath triggering", function() {
      var a, b, c, cCount;
      cCount = 0;
      a = new Signal(1);
      b = new Signal(function() {
        return a.value() + 1;
      });
      c = new Signal(function() {
        a.value() + b.value();
        return cCount += 1;
      });
      a.value(2);
      return expect(cCount).toEqual(2);
    });
    it("deferred signal with simple single dependency", function() {
      var a, b;
      a = b = null;
      runs(function() {
        a = new Signal(1);
        return b = new Signal(function(deferred) {
          setTimeout((function() {
            return deferred(function() {
              return 2 * a.value();
            });
          }), 200);
          return deferred;
        });
      });
      waitsFor((function() {
        return b.idle();
      }), 'define - deferred signal with simple single dependency', 500);
      runs(function() {
        expect(a.value()).toEqual(1);
        return expect(b.value()).toEqual(2);
      });
      runs(function() {
        return a.value(2);
      });
      waitsFor((function() {
        return b.idle();
      }), 'update - deferred signal with simple single dependency', 1000);
      return runs(function() {
        expect(a.value()).toEqual(2);
        return expect(b.value()).toEqual(4);
      });
    });
    it("deferred multi dependents", function() {
      var a, b, c;
      a = b = c = null;
      runs(function() {
        a = new Signal(1);
        b = new Signal(function(deferred) {
          setTimeout((function() {
            return deferred(function() {
              return 2 * a.value();
            });
          }), 100);
          return deferred;
        });
        return c = new Signal(function(deferred) {
          setTimeout((function() {
            return deferred(function() {
              return 1 + b.value();
            });
          }), 300);
          return deferred;
        });
      });
      waitsFor((function() {
        return b.idle() && c.idle();
      }), 'define - deferred multi dependents', 500);
      runs(function() {
        expect(a.value()).toEqual(1);
        expect(b.value()).toEqual(2);
        return expect(c.value()).toEqual(3);
      });
      runs(function() {
        return a.value(2);
      });
      waitsFor((function() {
        return b.idle() && c.idle();
      }), 'update - deferred multi dependents', 500);
      return runs(function() {
        expect(a.value()).toEqual(2);
        expect(b.value()).toEqual(4);
        return expect(c.value()).toEqual(5);
      });
    });
    return it("catch an error", function() {
      var a, err;
      err = void 0;
      a = new Signal(function() {
        throw 'an errror occured';
      });
      a["catch"](function(e) {
        return err = e;
      });
      expect(a.value()).toBe(void 0);
      return expect(err).toBe('an errror occured');
    });
  });

  xdescribe("Observer", function() {
    it("basic observer", function() {
      var a, b, c;
      a = new Signal(1);
      expect(a.value()).toEqual(1);
      b = null;
      expect(b).toEqual(null);
      c = new Observer(function() {
        return b = a.value();
      });
      expect(b).toEqual(1);
      a.value(2);
      return expect(b).toEqual(2);
    });
    it("multi observer", function() {
      var a, b, c, d, e, f;
      a = new Signal(1);
      b = new Signal(function() {
        return a.value();
      });
      c = new Signal(function() {
        return a.value();
      });
      d = new Signal(function() {
        return c.value();
      });
      e = 0;
      f = new Observer(function() {
        return e += a.value() + b.value() + c.value() + d.value();
      });
      expect(e).toEqual(4);
      a.value(2);
      return expect(e).toEqual(12);
    });
    it("read write observer", function() {
      var a, b, c;
      a = new Signal(1);
      b = new Signal(2);
      expect(a.value()).toEqual(1);
      expect(b.value()).toEqual(2);
      c = new Observer(function() {
        return b.value(a.value());
      });
      expect(b.value()).toEqual(1);
      a.value(3);
      expect(a.value()).toEqual(3);
      expect(b.value()).toEqual(3);
      b.value(4);
      expect(a.value()).toEqual(3);
      return expect(b.value()).toEqual(4);
    });
    it("another read write observer", function() {
      var a, b, c, d;
      a = 0;
      b = new Signal(1);
      c = new Signal(2);
      expect(a).toEqual(0);
      expect(b.value()).toEqual(1);
      expect(c.value()).toEqual(2);
      d = new Observer(function() {
        a += 1;
        b.value();
        return c.value(3);
      });
      expect(a).toEqual(1);
      expect(b.value()).toEqual(1);
      expect(c.value()).toEqual(3);
      a = 4;
      expect(a).toEqual(4);
      expect(b.value()).toEqual(1);
      expect(c.value()).toEqual(3);
      b.value(6);
      expect(a).toEqual(5);
      expect(b.value()).toEqual(6);
      expect(c.value()).toEqual(3);
      c.value(7);
      expect(a).toEqual(5);
      expect(b.value()).toEqual(6);
      return expect(c.value()).toEqual(7);
    });
    it("defered multi observer", function() {
      var a, b, c, d, e, f;
      a = b = c = d = e = f = null;
      runs(function() {
        a = new Signal(1);
        b = new Signal(function(deferred) {
          setTimeout((function() {
            return deferred(function() {
              return a.value();
            });
          }), 100);
          return deferred;
        });
        c = new Signal(function(deferred) {
          setTimeout((function() {
            return deferred(function() {
              return a.value();
            });
          }), 100);
          return deferred;
        });
        d = new Signal(function() {
          return c.value();
        });
        e = 0;
        return f = new Observer(function() {
          var value;
          value = a.value() + b.value() + c.value() + d.value();
          return e += a.idle() && b.idle() && c.idle() && d.idle() ? value : 0;
        });
      });
      waitsFor((function() {
        return f.ready();
      }), 'define - deferred multi dependents', 500);
      runs(function() {
        return expect(e).toEqual(4);
      });
      runs(function() {
        return a.value(2);
      });
      waitsFor((function() {
        return f.ready();
      }), 'update - deferred multi dependents', 500);
      return runs(function() {
        return expect(e).toEqual(12);
      });
    });
    return it("defered read write observer", function() {
      var a, b, c, d;
      a = b = c = d = null;
      runs(function() {
        a = new Signal(1);
        b = new Signal(function(deferred) {
          setTimeout((function() {
            return deferred(function() {
              return 2 * a.value();
            });
          }), 100);
          return deferred;
        });
        return c = new Signal(3);
      });
      waitsFor((function() {
        return b.idle();
      }), 'define - defered read write observer', 500);
      runs(function() {
        expect(a.value()).toEqual(1);
        expect(b.value()).toEqual(2);
        return expect(c.value()).toEqual(3);
      });
      runs(function() {
        return d = new Observer(function() {
          return c.value(b.value());
        });
      });
      waitsFor((function() {
        return d.ready();
      }), 'define d - defered read write observer', 500);
      runs(function() {
        return expect(c.value()).toEqual(2);
      });
      runs(function() {
        return a.value(3);
      });
      waitsFor((function() {
        return d.ready();
      }), 'update a - defered read write observer', 500);
      return runs(function() {
        expect(a.value()).toEqual(3);
        expect(b.value()).toEqual(6);
        return expect(c.value()).toEqual(6);
      });
    });
  });

  xdescribe("Publisher", function() {
    return it("Publishs a Signal captured by an Observer", function() {
      var a, b;
      a = new Publisher();
      b = 0;
      a.subscribe(function(value) {
        return b = value;
      });
      a.notify(123);
      return expect(b).toEqual(123);
    });
  });

  xdescribe("Signal misc.", function() {
    it("object setter", function() {
      var a, b;
      a = new Signal({});
      b = new Signal(function() {
        return "Serialized: " + JSON.stringify(a.value());
      });
      expect(b.value()).toEqual("Serialized: {}");
      a.value()["x"] = 1;
      expect(JSON.stringify(a.value())).toEqual('{"x":1}');
      expect(b.value()).toEqual("Serialized: {}");
      a.value(a.value());
      expect(JSON.stringify(a.value())).toEqual('{"x":1}');
      expect(b.value()).toEqual('Serialized: {"x":1}');
      a.set("x", 2);
      expect(JSON.stringify(a.value())).toEqual('{"x":2}');
      expect(b.value()).toEqual('Serialized: {"x":2}');
      a.value(3);
      expect(a.value()).toEqual(3);
      expect(b.value()).toEqual('Serialized: 3');
      return expect(a.set).toEqual(void 0);
    });
    it("basic array push ", function() {
      var a;
      a = new Signal([]);
      a.push("x");
      return expect(JSON.stringify(a.value())).toEqual('["x"]');
    });
    it("array initialized properly", function() {
      var a;
      a = new Signal([]);
      a.push("x");
      expect(JSON.stringify(a.value())).toEqual('["x"]');
      a.push("y");
      expect(JSON.stringify(a.value())).toEqual('["x","y"]');
      a.pop();
      expect(JSON.stringify(a.value())).toEqual('["x"]');
      a.pop();
      expect(JSON.stringify(a.value())).toEqual('[]');
      a.unshift("x");
      expect(JSON.stringify(a.value())).toEqual('["x"]');
      a.unshift("y");
      expect(JSON.stringify(a.value())).toEqual('["y","x"]');
      a.unshift("z");
      expect(JSON.stringify(a.value())).toEqual('["z","y","x"]');
      a.sort();
      expect(JSON.stringify(a.value())).toEqual('["x","y","z"]');
      a.reverse();
      expect(JSON.stringify(a.value())).toEqual('["z","y","x"]');
      a.splice(1, 1, "w");
      expect(JSON.stringify(a.value())).toEqual('["z","w","x"]');
      a.shift();
      return expect(JSON.stringify(a.value())).toEqual('["w","x"]');
    });
    return it("array methods", function() {
      var a, b, c, d;
      a = new Signal([]);
      b = new Signal(function() {
        return "Serialized: " + JSON.stringify(a.value());
      });
      expect(JSON.stringify(a.value())).toEqual('[]');
      expect(b.value()).toEqual('Serialized: []');
      a.value()[0] = "x";
      expect(JSON.stringify(a.value())).toEqual('["x"]');
      expect(b.value()).toEqual('Serialized: []');
      a.value(a.value());
      expect(JSON.stringify(a.value())).toEqual('["x"]');
      expect(b.value()).toEqual('Serialized: ["x"]');
      a.set(1, "y");
      expect(JSON.stringify(a.value())).toEqual('["x","y"]');
      expect(b.value()).toEqual('Serialized: ["x","y"]');
      a.push("z");
      expect(JSON.stringify(a.value())).toEqual('["x","y","z"]');
      expect(b.value()).toEqual('Serialized: ["x","y","z"]');
      a.unshift("w");
      expect(JSON.stringify(a.value())).toEqual('["w","x","y","z"]');
      expect(b.value()).toEqual('Serialized: ["w","x","y","z"]');
      c = a.shift();
      expect(JSON.stringify(a.value())).toEqual('["x","y","z"]');
      expect(b.value()).toEqual('Serialized: ["x","y","z"]');
      expect(c).toEqual("w");
      a.reverse();
      expect(JSON.stringify(a.value())).toEqual('["z","y","x"]');
      expect(b.value()).toEqual('Serialized: ["z","y","x"]');
      d = a.pop();
      expect(JSON.stringify(a.value())).toEqual('["z","y"]');
      expect(b.value()).toEqual('Serialized: ["z","y"]');
      a.push("foo");
      a.push("bar");
      expect(JSON.stringify(a.value())).toEqual('["z","y","foo","bar"]');
      expect(b.value()).toEqual('Serialized: ["z","y","foo","bar"]');
      d = a.splice(1, 2);
      expect(JSON.stringify(d)).toEqual('["y","foo"]');
      expect(JSON.stringify(a.value())).toEqual('["z","bar"]');
      expect(b.value()).toEqual('Serialized: ["z","bar"]');
      a.value("pies");
      expect(a.value()).toEqual("pies");
      expect(b.value()).toEqual('Serialized: "pies"');
      expect(a.pop).toEqual(void 0);
      expect(a.push).toEqual(void 0);
      expect(a.shift).toEqual(void 0);
      expect(a.unshift).toEqual(void 0);
      expect(a.sort).toEqual(void 0);
      expect(a.reverse).toEqual(void 0);
      return expect(a.splice).toEqual(void 0);
    });
  });

}).call(this);
