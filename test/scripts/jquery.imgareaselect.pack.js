(function ($) {
    var _1 = Math.abs,
        _2 = Math.max,
        _3 = Math.min,
        _4 = Math.round;

    function _5() {
        return $("<div/>")
    };
    $.imgAreaSelect = function (_6, _7) {
        var _8 = $(_6),
            _9, _a = _5(),
            _b = _5(),
            _c = _5().add(_5()).add(_5()).add(_5()),
            _d = _5().add(_5()).add(_5()).add(_5()),
            _e = $([]),
            _f, _10, top, _11 = {
                left: 0,
                top: 0
            }, _12, _13, _14, _15 = {
                left: 0,
                top: 0
            }, _16 = 0,
            _17 = "absolute",
            _18, _19, _1a, _1b, _1c = 10,
            _1d, _1e, _1f, _20, _21, _22, _23, x1, y1, x2, y2, _24 = {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0,
                width: 0,
                height: 0
            }, _25 = document.documentElement,
            $p, d, i, o, w, h, _26;

        function _27(x) {
            return x + _11.left - _15.left
        };

        function _28(y) {
            return y + _11.top - _15.top
        };

        function _29(x) {
            return x - _11.left + _15.left
        };

        function _2a(y) {
            return y - _11.top + _15.top
        };

        function evX(_2b) {
            return _2b.pageX - _15.left
        };

        function evY(_2c) {
            return _2c.pageY - _15.top
        };

        function _2d(_2e) {
            var sx = _2e || _1a,
                sy = _2e || _1b;
            return {
                x1: _4(_24.x1 * sx),
                y1: _4(_24.y1 * sy),
                x2: _4(_24.x2 * sx),
                y2: _4(_24.y2 * sy),
                width: _4(_24.x2 * sx) - _4(_24.x1 * sx),
                height: _4(_24.y2 * sy) - _4(_24.y1 * sy)
            }
        };

        function _2f(x1, y1, x2, y2, _30) {
            var sx = _30 || _1a,
                sy = _30 || _1b;
            _24 = {
                x1: _4(x1 / sx || 0),
                y1: _4(y1 / sy || 0),
                x2: _4(x2 / sx || 0),
                y2: _4(y2 / sy || 0)
            };
            _24.width = _24.x2 - _24.x1;
            _24.height = _24.y2 - _24.y1
        };

        function _31() {
            if (!_8.width()) {
                return
            }
            _11 = {
                left: _4(_8.offset().left),
                top: _4(_8.offset().top)
            };
            _12 = _8.innerWidth();
            _13 = _8.innerHeight();
            _11.top += (_8.outerHeight() - _13) >> 1;
            _11.left += (_8.outerWidth() - _12) >> 1;
            _1e = _7.minWidth || 0;
            _1f = _7.minHeight || 0;
            _20 = _3(_7.maxWidth || 1 << 24, _12);
            _21 = _3(_7.maxHeight || 1 << 24, _13);
            if ($().jquery == "1.3.2" && _17 == "fixed" && !_25["getBoundingClientRect"]) {
                _11.top += _2(document.body.scrollTop, _25.scrollTop);
                _11.left += _2(document.body.scrollLeft, _25.scrollLeft)
            }
            _15 = $.inArray(_14.css("position"), ["absolute", "relative"]) + 1 ? {
                left: _4(_14.offset().left) - _14.scrollLeft(),
                top: _4(_14.offset().top) - _14.scrollTop()
            } : _17 == "fixed" ? {
                left: $(document).scrollLeft(),
                top: $(document).scrollTop()
            } : {
                left: 0,
                top: 0
            };
            _10 = _27(0);
            top = _28(0);
            if (_24.x2 > _12 || _24.y2 > _13) {
                _32()
            }
        };

        function _33(_34) {
            if (!_23) {
                return
            }
            _a.css({
                left: _27(_24.x1),
                top: _28(_24.y1)
            }).add(_b).width(w = _24.width).height(h = _24.height);
            _b.add(_c).add(_e).css({
                left: 0,
                top: 0
            });
            _c.width(_2(w - _c.outerWidth() + _c.innerWidth(), 0)).height(_2(h - _c.outerHeight() + _c.innerHeight(), 0));
            $(_d[0]).css({
                left: _10,
                top: top,
                width: _24.x1,
                height: _13
            });
            $(_d[1]).css({
                left: _10 + _24.x1,
                top: top,
                width: w,
                height: _24.y1
            });
            $(_d[2]).css({
                left: _10 + _24.x2,
                top: top,
                width: _12 - _24.x2,
                height: _13
            });
            $(_d[3]).css({
                left: _10 + _24.x1,
                top: top + _24.y2,
                width: w,
                height: _13 - _24.y2
            });
            w -= _e.outerWidth();
            h -= _e.outerHeight();
            switch (_e.length) {
            case 8:
                $(_e[4]).css({
                    left: w >> 1
                });
                $(_e[5]).css({
                    left: w,
                    top: h >> 1
                });
                $(_e[6]).css({
                    left: w >> 1,
                    top: h
                });
                $(_e[7]).css({
                    top: h >> 1
                });
            case 4:
                _e.slice(1, 3).css({
                    left: w
                });
                _e.slice(2, 4).css({
                    top: h
                })
            }
            if (_34 !== false) {
                if ($.imgAreaSelect.keyPress != _35) {
                    $(document).unbind($.imgAreaSelect.keyPress, $.imgAreaSelect.onKeyPress)
                }
                if (_7.keys) {
                    $(document)[$.imgAreaSelect.keyPress]($.imgAreaSelect.onKeyPress = _35)
                }
            }
            if ($.browser.msie && _c.outerWidth() - _c.innerWidth() == 2) {
                _c.css("margin", 0);
                setTimeout(function () {
                    _c.css("margin", "auto")
                }, 0)
            }
        };

        function _36(_37) {
            _31();
            _33(_37);
            x1 = _27(_24.x1);
            y1 = _28(_24.y1);
            x2 = _27(_24.x2);
            y2 = _28(_24.y2)
        };

        function _38(_39, fn) {
            _7.fadeSpeed ? _39.fadeOut(_7.fadeSpeed, fn) : _39.hide()
        };

        function _3a(_3b) {
            var x = _29(evX(_3b)) - _24.x1,
                y = _2a(evY(_3b)) - _24.y1;
            if (!_26) {
                _31();
                _26 = true;
                _a.one("mouseout", function () {
                    _26 = false
                })
            }
            _1d = "";
            if (_7.resizable) {
                if (y <= _7.resizeMargin) {
                    _1d = "n"
                } else {
                    if (y >= _24.height - _7.resizeMargin) {
                        _1d = "s"
                    }
                } if (x <= _7.resizeMargin) {
                    _1d += "w"
                } else {
                    if (x >= _24.width - _7.resizeMargin) {
                        _1d += "e"
                    }
                }
            }
            _a.css("cursor", _1d ? _1d + "-resize" : _7.movable ? "move" : "");
            if (_f) {
                _f.toggle()
            }
        };

        function _3c(_3d) {
            $("body").css("cursor", "");
            if (_7.autoHide || _24.width * _24.height == 0) {
                _38(_a.add(_d), function () {
                    $(this).hide()
                })
            }
            $(document).unbind("mousemove", _3e);
            _a.mousemove(_3a);
            _7.onSelectEnd(_6, _2d())
        };

        function _3f(_40) {
            if (_40.which != 1) {
                return false
            }
            _31();
            if (_1d) {
                $("body").css("cursor", _1d + "-resize");
                x1 = _27(_24[/w/.test(_1d) ? "x2" : "x1"]);
                y1 = _28(_24[/n/.test(_1d) ? "y2" : "y1"]);
                $(document).mousemove(_3e).one("mouseup", _3c);
                _a.unbind("mousemove", _3a)
            } else {
                if (_7.movable) {
                    _18 = _10 + _24.x1 - evX(_40);
                    _19 = top + _24.y1 - evY(_40);
                    _a.unbind("mousemove", _3a);
                    $(document).mousemove(_41).one("mouseup", function () {
                        _7.onSelectEnd(_6, _2d());
                        $(document).unbind("mousemove", _41);
                        _a.mousemove(_3a)
                    })
                } else {
                    _8.mousedown(_40)
                }
            }
            return false
        };

        function _42(_43) {
            if (_22) {
                if (_43) {
                    x2 = _2(_10, _3(_10 + _12, x1 + _1(y2 - y1) * _22 * (x2 > x1 || -1)));
                    y2 = _4(_2(top, _3(top + _13, y1 + _1(x2 - x1) / _22 * (y2 > y1 || -1))));
                    x2 = _4(x2)
                } else {
                    y2 = _2(top, _3(top + _13, y1 + _1(x2 - x1) / _22 * (y2 > y1 || -1)));
                    x2 = _4(_2(_10, _3(_10 + _12, x1 + _1(y2 - y1) * _22 * (x2 > x1 || -1))));
                    y2 = _4(y2)
                }
            }
        };

        function _32() {
            x1 = _3(x1, _10 + _12);
            y1 = _3(y1, top + _13);
            if (_1(x2 - x1) < _1e) {
                x2 = x1 - _1e * (x2 < x1 || -1);
                if (x2 < _10) {
                    x1 = _10 + _1e
                } else {
                    if (x2 > _10 + _12) {
                        x1 = _10 + _12 - _1e
                    }
                }
            }
            if (_1(y2 - y1) < _1f) {
                y2 = y1 - _1f * (y2 < y1 || -1);
                if (y2 < top) {
                    y1 = top + _1f
                } else {
                    if (y2 > top + _13) {
                        y1 = top + _13 - _1f
                    }
                }
            }
            x2 = _2(_10, _3(x2, _10 + _12));
            y2 = _2(top, _3(y2, top + _13));
            _42(_1(x2 - x1) < _1(y2 - y1) * _22);
            if (_1(x2 - x1) > _20) {
                x2 = x1 - _20 * (x2 < x1 || -1);
                _42()
            }
            if (_1(y2 - y1) > _21) {
                y2 = y1 - _21 * (y2 < y1 || -1);
                _42(true)
            }
            _24 = {
                x1: _29(_3(x1, x2)),
                x2: _29(_2(x1, x2)),
                y1: _2a(_3(y1, y2)),
                y2: _2a(_2(y1, y2)),
                width: _1(x2 - x1),
                height: _1(y2 - y1)
            };
            _33();
            _7.onSelectChange(_6, _2d())
        };

        function _3e(_44) {
            x2 = _1d == "" || /w|e/.test(_1d) || _22 ? evX(_44) : _27(_24.x2);
            y2 = _1d == "" || /n|s/.test(_1d) || _22 ? evY(_44) : _28(_24.y2);
            _32();
            return false
        };

        function _45(_46, _47) {
            x2 = (x1 = _46) + _24.width;
            y2 = (y1 = _47) + _24.height;
            $.extend(_24, {
                x1: _29(x1),
                y1: _2a(y1),
                x2: _29(x2),
                y2: _2a(y2)
            });
            _33();
            _7.onSelectChange(_6, _2d())
        };

        function _41(_48) {
            x1 = _2(_10, _3(_18 + evX(_48), _10 + _12 - _24.width));
            y1 = _2(top, _3(_19 + evY(_48), top + _13 - _24.height));
            _45(x1, y1);
            _48.preventDefault();
            return false
        };

        function _49() {
            $(document).unbind("mousemove", _49);
            _31();
            x2 = x1;
            y2 = y1;
            _32();
            _1d = "";
            if (_d.is(":not(:visible)")) {
                _a.add(_d).hide().fadeIn(_7.fadeSpeed || 0)
            }
            _23 = true;
            $(document).unbind("mouseup", _4a).mousemove(_3e).one("mouseup", _3c);
            _a.unbind("mousemove", _3a);
            _7.onSelectStart(_6, _2d())
        };

        function _4a() {
            $(document).unbind("mousemove", _49).unbind("mouseup", _4a);
            _38(_a.add(_d));
            _2f(_29(x1), _2a(y1), _29(x1), _2a(y1));
            _7.onSelectChange(_6, _2d());
            _7.onSelectEnd(_6, _2d())
        };

        function _4b(_4c) {
            if (_4c.which != 1 || _d.is(":animated")) {
                return false
            }
            _31();
            _18 = x1 = evX(_4c);
            _19 = y1 = evY(_4c);
            $(document).mousemove(_49).mouseup(_4a);
            return false
        };

        function _4d() {
            _36(false)
        };

        function _4e() {
            _9 = true;
            _4f(_7 = $.extend({
                classPrefix: "imgareaselect",
                movable: true,
                parent: "body",
                resizable: true,
                resizeMargin: 10,
                onInit: function () {},
                onSelectStart: function () {},
                onSelectChange: function () {},
                onSelectEnd: function () {}
            }, _7));
            _a.add(_d).css({
                visibility: ""
            });
            if (_7.show) {
                _23 = true;
                _31();
                _33();
                _a.add(_d).hide().fadeIn(_7.fadeSpeed || 0)
            }
            setTimeout(function () {
                _7.onInit(_6, _2d())
            }, 0)
        };
        var _35 = function (_50) {
            var k = _7.keys,
                d, t, key = _50.keyCode;
            d = !isNaN(k.alt) && (_50.altKey || _50.originalEvent.altKey) ? k.alt : !isNaN(k.ctrl) && _50.ctrlKey ? k.ctrl : !isNaN(k.shift) && _50.shiftKey ? k.shift : !isNaN(k.arrows) ? k.arrows : 10;
            if (k.arrows == "resize" || (k.shift == "resize" && _50.shiftKey) || (k.ctrl == "resize" && _50.ctrlKey) || (k.alt == "resize" && (_50.altKey || _50.originalEvent.altKey))) {
                switch (key) {
                case 37:
                    d = -d;
                case 39:
                    t = _2(x1, x2);
                    x1 = _3(x1, x2);
                    x2 = _2(t + d, x1);
                    _42();
                    break;
                case 38:
                    d = -d;
                case 40:
                    t = _2(y1, y2);
                    y1 = _3(y1, y2);
                    y2 = _2(t + d, y1);
                    _42(true);
                    break;
                default:
                    return
                }
                _32()
            } else {
                x1 = _3(x1, x2);
                y1 = _3(y1, y2);
                switch (key) {
                case 37:
                    _45(_2(x1 - d, _10), y1);
                    break;
                case 38:
                    _45(x1, _2(y1 - d, top));
                    break;
                case 39:
                    _45(x1 + _3(d, _12 - _29(x2)), y1);
                    break;
                case 40:
                    _45(x1, y1 + _3(d, _13 - _2a(y2)));
                    break;
                default:
                    return
                }
            }
            return false
        };

        function _51(_52, _53) {
            for (option in _53) {
                if (_7[option] !== undefined) {
                    _52.css(_53[option], _7[option])
                }
            }
        };

        function _4f(_54) {
            if (_54.parent) {
                (_14 = $(_54.parent)).append(_a.add(_d))
            }
            $.extend(_7, _54);
            _31();
            if (_54.handles != null) {
                _e.remove();
                _e = $([]);
                i = _54.handles ? _54.handles == "corners" ? 4 : 8 : 0;
                while (i--) {
                    _e = _e.add(_5())
                }
                _e.addClass(_7.classPrefix + "-handle").css({
                    position: "absolute",
                    fontSize: 0,
                    zIndex: _16 + 1 || 1
                });
                if (!parseInt(_e.css("width")) >= 0) {
                    _e.width(5).height(5)
                }
                if (o = _7.borderWidth) {
                    _e.css({
                        borderWidth: o,
                        borderStyle: "solid"
                    })
                }
                _51(_e, {
                    borderColor1: "border-color",
                    borderColor2: "background-color",
                    borderOpacity: "opacity"
                })
            }
            _1a = _7.imageWidth / _12 || 1;
            _1b = _7.imageHeight / _13 || 1;
            if (_54.x1 != null) {
                _2f(_54.x1, _54.y1, _54.x2, _54.y2);
                _54.show = !_54.hide
            }
            if (_54.keys) {
                _7.keys = $.extend({
                    shift: 1,
                    ctrl: "resize"
                }, _54.keys)
            }
            _d.addClass(_7.classPrefix + "-outer");
            _b.addClass(_7.classPrefix + "-selection");
            for (i = 0; i++ < 4;) {
                $(_c[i - 1]).addClass(_7.classPrefix + "-border" + i)
            }
            _51(_b, {
                selectionColor: "background-color",
                selectionOpacity: "opacity"
            });
            _51(_c, {
                borderOpacity: "opacity",
                borderWidth: "border-width"
            });
            _51(_d, {
                outerColor: "background-color",
                outerOpacity: "opacity"
            });
            if (o = _7.borderColor1) {
                $(_c[0]).css({
                    borderStyle: "solid",
                    borderColor: o
                })
            }
            if (o = _7.borderColor2) {
                $(_c[1]).css({
                    borderStyle: "dashed",
                    borderColor: o
                })
            }
            _a.append(_b.add(_c).add(_f).add(_e));
            if ($.browser.msie) {
                if (o = _d.css("filter").match(/opacity=([0-9]+)/)) {
                    _d.css("opacity", o[1] / 100)
                }
                if (o = _c.css("filter").match(/opacity=([0-9]+)/)) {
                    _c.css("opacity", o[1] / 100)
                }
            }
            if (_54.hide) {
                _38(_a.add(_d))
            } else {
                if (_54.show && _9) {
                    _23 = true;
                    _a.add(_d).fadeIn(_7.fadeSpeed || 0);
                    _36()
                }
            }
            _22 = (d = (_7.aspectRatio || "").split(/:/))[0] / d[1];
            _8.add(_d).unbind("mousedown", _4b);
            if (_7.disable || _7.enable === false) {
                _a.unbind("mousemove", _3a).unbind("mousedown", _3f);
                $(window).unbind("resize", _4d)
            } else {
                if (_7.enable || _7.disable === false) {
                    if (_7.resizable || _7.movable) {
                        _a.mousemove(_3a).mousedown(_3f)
                    }
                    $(window).resize(_4d)
                }
                if (!_7.persistent) {
                    _8.add(_d).mousedown(_4b)
                }
            }
            _7.enable = _7.disable = undefined
        };
        this.remove = function () {
            _4f({
                disable: true
            });
            _a.add(_d).remove()
        };
        this.getOptions = function () {
            return _7
        };
        this.setOptions = _4f;
        this.getSelection = _2d;
        this.setSelection = _2f;
        this.update = _36;
        $p = _8;
        while ($p.length) {
            _16 = _2(_16, !isNaN($p.css("z-index")) ? $p.css("z-index") : _16);
            if ($p.css("position") == "fixed") {
                _17 = "fixed"
            }
            $p = $p.parent(":not(body)")
        }
        _16 = _7.zIndex || _16;
        if ($.browser.msie) {
            _8.attr("unselectable", "on")
        }
        $.imgAreaSelect.keyPress = $.browser.msie || $.browser.safari ? "keydown" : "keypress";
        if ($.browser.opera) {
            _f = _5().css({
                width: "100%",
                height: "100%",
                position: "absolute",
                zIndex: _16 + 2 || 2
            })
        }
        _a.add(_d).css({
            visibility: "hidden",
            position: _17,
            overflow: "hidden",
            zIndex: _16 || "0"
        });
        _a.css({
            zIndex: _16 + 2 || 2
        });
        _b.add(_c).css({
            position: "absolute",
            fontSize: 0
        });
        _6.complete || _6.readyState == "complete" || !_8.is("img") ? _4e() : _8.one("load", _4e);
        if ($.browser.msie && $.browser.version >= 9) {
            _6.src = _6.src
        }
    };
    $.fn.imgAreaSelect = function (_55) {
        _55 = _55 || {};
        this.each(function () {
            if ($(this).data("imgAreaSelect")) {
                if (_55.remove) {
                    $(this).data("imgAreaSelect").remove();
                    $(this).removeData("imgAreaSelect")
                } else {
                    $(this).data("imgAreaSelect").setOptions(_55)
                }
            } else {
                if (!_55.remove) {
                    if (_55.enable === undefined && _55.disable === undefined) {
                        _55.enable = true
                    }
                    $(this).data("imgAreaSelect", new $.imgAreaSelect(this, _55))
                }
            }
        });
        if (_55.instance) {
            return $(this).data("imgAreaSelect")
        }
        return this
    }
})(jQuery);