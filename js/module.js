/* Compile Time: 12/27/20 01:40:00 */
/*
 * gas.js -- for Gakeun.js on Neoca Grav theme
 *
 */

(function () {

function gas(query) {

	/*
	 * gas is Neoca Script
	 *
	 */

	if (typeof(query) == 'object') {
		this.ele = query
	} else {
		this.ele = document.querySelector(query);
	}

	if (this.ele === null) { return false; }

	if (!(this instanceof gas)) { return new gas(query); }

}

gas.prototype = {

	cl: function() {
		return console.log(this.ele);
	},

	load: function(source,functions=false) {
		var request = new XMLHttpRequest();
		request.open('GET', source, true);
		var ele = this.ele;

		const send = XMLHttpRequest.prototype.send
		XMLHttpRequest.prototype.send = function(e) {
			this.addEventListener('load', function(event) {
				if (functions) { functions(); }
			})
			return send.apply(this, arguments)
		}

		request.onload = function(e) {
			if (request.status >= 200 && request.status < 400) {
				var resp = request.responseText;
				ele.innerHTML = resp;
			} else {
				console.log(source+' not loading.');
			}
		};


		request.send()

	},
	id: function(what) {
		return this.ele.id;
	},
	dataRemove: function(what) {
		this.ele.removeAttribute('data-'+what);		
	},
	
	data: function(what,value=false) {

		if (value) { this.ele.setAttribute('data-'+what,value); }
		else if (value==null){ this.ele.removeAttribute('data-'+what); }
		return this.ele.getAttribute('data-'+what);
	},

	attr: function(what,value=false) {
		if (value) { this.ele.setAttribute(what,value); }
		else if (value==null){ this.ele.removeAttribute(what); }
		return this.ele.getAttribute(what);
	},

	offset: function() {
		return [ this.ele.offsetTop, this.ele.offsetLeft, this.ele.offsetWidth, this.ele.offsetHeight];
	},

	class: function() {
		return this.ele.classList.value;
	},

	hasClass: function(nclass) {
		if (this.ele.classList.contains(nclass)) {
			return true;
		} else {
			return false;
		}
	},
	addClass: function(nclass) {
		if (!this.ele.classList.contains(nclass)) {
			this.ele.classList.add(nclass);
		}
	},
	removeClass: function(nclass) {
		if (this.ele.classList.contains(nclass)) {
			this.ele.classList.remove(nclass);
		}
	},
	toggleClass: function(nclass) {
		if (this.ele.classList.contains(nclass)) {
			this.ele.classList.remove(nclass);
		} else {
			this.ele.classList.add(nclass);
		}
	},
	content: function(newcontent=false) {
		if (newcontent) { this.ele.innerHTML = newcontent; }
		else { return this.ele.innerHTML; }
	},

	styleParse: function() {
		var styles = this.ele.style;
		var res = '';
		for (var p in styles) {
			if ((styles[styles[p]]) && styles[styles[p]]!=='initial') {
					res += styles[p]+": "+ styles[styles[p]].toString()+'; ';
			}
		}
		return res.trim();
	},


	cssConstruct: function(styles) {
		const newSheet = new CSSStyleSheet();
		newSheet.replaceSync(styles);
		document.adoptedStyleSheets = document.adoptedStyleSheets.concat(newSheet);
//		this.ele.adoptedStyleSheets = document.adoptedStyleSheets.concat(newSheet); 
	},
	
	cssvar: function(what,value=false,important=false) {
		var c = getComputedStyle(this.ele)
		if (value) {
			if (important) {
				this.ele.style.setProperty('--'+what,value,'important');
			} else {
				this.ele.style.setProperty('--'+what,value);
			}
	} else {
			return c.getPropertyValue('--'+what).trim()
		}
	},

	cssvarRemove: function(what) {
		this.ele.style.removeProperty('--'+what);
	},

	style: function(what=false,value=false) {
		var styles = this.ele.style;
		var res = '';
		if (!what) {

			res = this.attr('style');
			return res;
		} else {
			what = what.replace(/-/gi,function(r) {
				return r.charAt(0).toUpperCase() + r.slice(1)
			});
			if (value) { this.ele.style[what]=value; }
		}
	},
	hide: function() {
		this.style('display','none');
	},
	show: function(mode='block') {
		this.style('display',mode);
	},
	value: function(val=false) {
		if (val) {
			this.ele.value = val;
		} else {
			return this.ele.val;
		}
	},
	height: function(value=false) {
		return this.ele.offsetHeight
	},
	width:function(value=false) {
		return this.ele.offsetWidth;
	},
	append:function(value=false) {
		if (value) { this.ele.insertAdjacentHTML("afterend",value.toString) }
	},
	prepend:function(value=false) {
		if (value) { this.ele.insertAdjacentHTML("afterbegin",value) }
	}

}

window.gas = gas;

})();/* w3color.js ver.1.18 by w3schools.com (Do not remove this line)*/
(function () {
function w3color(color, elmnt) {
  if (!(this instanceof w3color)) { return new w3color(color, elmnt); }
  if (typeof color == "object") {return color; }
  this.attachValues(toColorObject(color));
  if (elmnt) {elmnt.style.backgroundColor = this.toRgbString();}
}
w3color.prototype = {
  toRgbString : function () {
    return "rgb(" + this.red + ", " + this.green + ", " + this.blue + ")";
  },
  toRgbaString : function () {
    return "rgba(" + this.red + ", " + this.green + ", " + this.blue + ", " + this.opacity + ")";
  },
  toHwbString : function () {
    return "hwb(" + this.hue + ", " + Math.round(this.whiteness * 100) + "%, " + Math.round(this.blackness * 100) + "%)";
  },
  toHwbStringDecimal : function () {
    return "hwb(" + this.hue + ", " + this.whiteness + ", " + this.blackness + ")";
  },
  toHwbaString : function () {
    return "hwba(" + this.hue + ", " + Math.round(this.whiteness * 100) + "%, " + Math.round(this.blackness * 100) + "%, " + this.opacity + ")";
  },
  toHslString : function () {
    return "hsl(" + this.hue + ", " + Math.round(this.sat * 100) + "%, " + Math.round(this.lightness * 100) + "%)";
  },
  toHslStringDecimal : function () {
    return "hsl(" + this.hue + ", " + this.sat + ", " + this.lightness + ")";
  },
  toHslaString : function () {
    return "hsla(" + this.hue + ", " + Math.round(this.sat * 100) + "%, " + Math.round(this.lightness * 100) + "%, " + this.opacity + ")";
  },
  toCmykString : function () {
    return "cmyk(" + Math.round(this.cyan * 100) + "%, " + Math.round(this.magenta * 100) + "%, " + Math.round(this.yellow * 100) + "%, " + Math.round(this.black * 100) + "%)";
  },
  toCmykStringDecimal : function () {
    return "cmyk(" + this.cyan + ", " + this.magenta + ", " + this.yellow + ", " + this.black + ")";
  },
  toNcolString : function () {
    return this.ncol + ", " + Math.round(this.whiteness * 100) + "%, " + Math.round(this.blackness * 100) + "%";
  },
  toNcolStringDecimal : function () {
    return this.ncol + ", " + this.whiteness + ", " + this.blackness;
  },
  toNcolaString : function () {
    return this.ncol + ", " + Math.round(this.whiteness * 100) + "%, " + Math.round(this.blackness * 100) + "%, " + this.opacity;
  },
  toName : function () {
    var r, g, b, colorhexs = getColorArr('hexs');
    for (i = 0; i < colorhexs.length; i++) {
      r = parseInt(colorhexs[i].substr(0,2), 16);
      g = parseInt(colorhexs[i].substr(2,2), 16);
      b = parseInt(colorhexs[i].substr(4,2), 16);
      if (this.red == r && this.green == g && this.blue == b) {
        return getColorArr('names')[i];
      }
    }
    return "";
  },
  toHexString : function () {
    var r = toHex(this.red);
    var g = toHex(this.green);
    var b = toHex(this.blue);
    return "#" +  r + g + b;
  },
  toRgb : function () {
    return {r : this.red, g : this.green, b : this.blue, a : this.opacity};
  },
  toHsl : function () {
    return {h : this.hue, s : this.sat, l : this.lightness, a : this.opacity};
  },
  toHwb : function () {
    return {h : this.hue, w : this.whiteness, b : this.blackness, a : this.opacity};
  },
  toCmyk : function () {
    return {c : this.cyan, m : this.magenta, y : this.yellow, k : this.black, a : this.opacity};
  },
  toNcol : function () {
    return {ncol : this.ncol, w : this.whiteness, b : this.blackness, a : this.opacity};
  },
  isDark : function (n) {
    var m = (n || 128);
    return (((this.red * 299 + this.green * 587 + this.blue * 114) / 1000) < m);
  },
  saturate : function (n) {
    var x, rgb, color;
    x = (n / 100 || 0.1);
    this.sat += x;
    if (this.sat > 1) {this.sat = 1;}
    rgb = hslToRgb(this.hue, this.sat, this.lightness);
    color = colorObject(rgb, this.opacity, this.hue, this.sat);
    this.attachValues(color);
  },
  desaturate : function (n) {
    var x, rgb, color;
    x = (n / 100 || 0.1);
    this.sat -= x;
    if (this.sat < 0) {this.sat = 0;}
    rgb = hslToRgb(this.hue, this.sat, this.lightness);
    color = colorObject(rgb, this.opacity, this.hue, this.sat);
    this.attachValues(color);
  },
  lighter : function (n) {
    var x, rgb, color;
    x = (n / 100 || 0.1);
    this.lightness += x;
    if (this.lightness > 1) {this.lightness = 1;}
    rgb = hslToRgb(this.hue, this.sat, this.lightness);
    color = colorObject(rgb, this.opacity, this.hue, this.sat);
    this.attachValues(color);
  },
  darker : function (n) {
    var x, rgb, color;
    x = (n / 100 || 0.1);
    this.lightness -= x;
    if (this.lightness < 0) {this.lightness = 0;}
    rgb = hslToRgb(this.hue, this.sat, this.lightness);
    color = colorObject(rgb, this.opacity, this.hue, this.sat);
    this.attachValues(color);
  },
  attachValues : function(color) {
    this.red = color.red;
    this.green = color.green;
    this.blue = color.blue;
    this.hue = color.hue;
    this.sat = color.sat;
    this.lightness = color.lightness;
    this.whiteness = color.whiteness;
    this.blackness = color.blackness;
    this.cyan = color.cyan;
    this.magenta = color.magenta;
    this.yellow = color.yellow;
    this.black = color.black;
    this.ncol = color.ncol;
    this.opacity = color.opacity;
    this.valid = color.valid;
  }
};
function toColorObject(c) {
  var x, y, typ, arr = [], arrlength, i, opacity, match, a, hue, sat, rgb, colornames = [], colorhexs = [];
  c = w3trim(c.toLowerCase());
  x = c.substr(0,1).toUpperCase();
  y = c.substr(1);
  a = 1;
  if ((x == "R" || x == "Y" || x == "G" || x == "C" || x == "B" || x == "M" || x == "W") && !isNaN(y)) {
    if (c.length == 6 && c.indexOf(",") == -1) {
    } else {
      c = "ncol(" + c + ")";
    }
  }
  if (c.length != 3 && c.length != 6 && !isNaN(c)) {c = "ncol(" + c + ")";}
  if (c.indexOf(",") > 0 && c.indexOf("(") == -1) {c = "ncol(" + c + ")";}  
  if (c.substr(0, 3) == "rgb" || c.substr(0, 3) == "hsl" || c.substr(0, 3) == "hwb" || c.substr(0, 4) == "ncol" || c.substr(0, 4) == "cmyk") {
    if (c.substr(0, 4) == "ncol") {
      if (c.split(",").length == 4 && c.indexOf("ncola") == -1) {
        c = c.replace("ncol", "ncola");
      }
      typ = "ncol";
      c = c.substr(4);
    } else if (c.substr(0, 4) == "cmyk") {
      typ = "cmyk";
      c = c.substr(4);
    } else {
      typ = c.substr(0, 3);
      c = c.substr(3);
    }
    arrlength = 3;
    opacity = false;
    if (c.substr(0, 1).toLowerCase() == "a") {
      arrlength = 4;
      opacity = true;
      c = c.substr(1);
    } else if (typ == "cmyk") {
      arrlength = 4;
      if (c.split(",").length == 5) {
        arrlength = 5;
        opacity = true;
      }
    }
    c = c.replace("(", "");
    c = c.replace(")", "");
    arr = c.split(",");
    if (typ == "rgb") {
      if (arr.length != arrlength) {
        return emptyObject();
      }
      for (i = 0; i < arrlength; i++) {
        if (arr[i] == "" || arr[i] == " ") {arr[i] = "0"; }
        if (arr[i].indexOf("%") > -1) {
          arr[i] = arr[i].replace("%", "");
          arr[i] = Number(arr[i] / 100);
          if (i < 3 ) {arr[i] = Math.round(arr[i] * 255);}
        }
        if (isNaN(arr[i])) {return emptyObject(); }
        if (parseInt(arr[i]) > 255) {arr[i] = 255; }
        if (i < 3) {arr[i] = parseInt(arr[i]);}
        if (i == 3 && Number(arr[i]) > 1) {arr[i] = 1;}
      }
      rgb = {r : arr[0], g : arr[1], b : arr[2]};
      if (opacity == true) {a = Number(arr[3]);}
    }
    if (typ == "hsl" || typ == "hwb" || typ == "ncol") {
      while (arr.length < arrlength) {arr.push("0"); }
      if (typ == "hsl" || typ == "hwb") {
        if (parseInt(arr[0]) >= 360) {arr[0] = 0; }
      }
      for (i = 1; i < arrlength; i++) {
        if (arr[i].indexOf("%") > -1) {
          arr[i] = arr[i].replace("%", "");
          arr[i] = Number(arr[i]);
          if (isNaN(arr[i])) {return emptyObject(); }
          arr[i] = arr[i] / 100;
        } else {
          arr[i] = Number(arr[i]);
        }
        if (Number(arr[i]) > 1) {arr[i] = 1;}
        if (Number(arr[i]) < 0) {arr[i] = 0;}
      }
      if (typ == "hsl") {rgb = hslToRgb(arr[0], arr[1], arr[2]); hue = Number(arr[0]); sat = Number(arr[1]);}
      if (typ == "hwb") {rgb = hwbToRgb(arr[0], arr[1], arr[2]);}
      if (typ == "ncol") {rgb = ncolToRgb(arr[0], arr[1], arr[2]);}
      if (opacity == true) {a = Number(arr[3]);}
    }
    if (typ == "cmyk") {
      while (arr.length < arrlength) {arr.push("0"); }
      for (i = 0; i < arrlength; i++) {
        if (arr[i].indexOf("%") > -1) {
          arr[i] = arr[i].replace("%", "");
          arr[i] = Number(arr[i]);
          if (isNaN(arr[i])) {return emptyObject(); }
          arr[i] = arr[i] / 100;
        } else {
          arr[i] = Number(arr[i]);
        }
        if (Number(arr[i]) > 1) {arr[i] = 1;}
        if (Number(arr[i]) < 0) {arr[i] = 0;}
      }
      rgb = cmykToRgb(arr[0], arr[1], arr[2], arr[3]);
      if (opacity == true) {a = Number(arr[4]);}
    }
  } else if (c.substr(0, 3) == "ncs") {
    rgb = ncsToRgb(c);
  } else {
    match = false;
    colornames = getColorArr('names');
    for (i = 0; i < colornames.length; i++) {
      if (c.toLowerCase() == colornames[i].toLowerCase()) {
        colorhexs = getColorArr('hexs');
        match = true;
        rgb = {
          r : parseInt(colorhexs[i].substr(0,2), 16),
          g : parseInt(colorhexs[i].substr(2,2), 16),
          b : parseInt(colorhexs[i].substr(4,2), 16)
        };
        break;
      }
    }
    if (match == false) {
      c = c.replace("#", "");
      if (c.length == 3) {c = c.substr(0,1) + c.substr(0,1) + c.substr(1,1) + c.substr(1,1) + c.substr(2,1) + c.substr(2,1);}
      for (i = 0; i < c.length; i++) {
        if (!isHex(c.substr(i, 1))) {return emptyObject(); }
      }
      arr[0] = parseInt(c.substr(0,2), 16);
      arr[1] = parseInt(c.substr(2,2), 16);
      arr[2] = parseInt(c.substr(4,2), 16);
      for (i = 0; i < 3; i++) {
        if (isNaN(arr[i])) {return emptyObject(); }
      }
      rgb = {
        r : arr[0],
        g : arr[1],
        b : arr[2]
      };
    }
  }
  return colorObject(rgb, a, hue, sat);
}
function colorObject(rgb, a, h, s) {
  var hsl, hwb, cmyk, ncol, color, hue, sat;
  if (!rgb) {return emptyObject();}
  if (a === null) {a = 1;}
  hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  hwb = rgbToHwb(rgb.r, rgb.g, rgb.b);
  cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
  hue = (h || hsl.h);
  sat = (s || hsl.s);   
  ncol = hueToNcol(hue);
  color = {
    red : rgb.r,
    green : rgb.g,
    blue : rgb.b,
    hue : hue,
    sat : sat,
    lightness : hsl.l,
    whiteness : hwb.w,
    blackness : hwb.b,
    cyan : cmyk.c,
    magenta : cmyk.m,
    yellow : cmyk.y,
    black : cmyk.k,
    ncol : ncol,
    opacity : a,
    valid : true
  };
  color = roundDecimals(color);
  return color;
}
function emptyObject() {
  return {
    red : 0,
    green : 0,
    blue : 0,
    hue : 0,
    sat : 0,
    lightness : 0,
    whiteness : 0,
    blackness : 0,
    cyan : 0,
    magenta : 0,
    yellow : 0,
    black : 0,
    ncol : "R",
    opacity : 1,
    valid : false
  };
}
function getColorArr(x) {
  if (x == "names") {return ['AliceBlue','AntiqueWhite','Aqua','Aquamarine','Azure','Beige','Bisque','Black','BlanchedAlmond','Blue','BlueViolet','Brown','BurlyWood','CadetBlue','Chartreuse','Chocolate','Coral','CornflowerBlue','Cornsilk','Crimson','Cyan','DarkBlue','DarkCyan','DarkGoldenRod','DarkGray','DarkGrey','DarkGreen','DarkKhaki','DarkMagenta','DarkOliveGreen','DarkOrange','DarkOrchid','DarkRed','DarkSalmon','DarkSeaGreen','DarkSlateBlue','DarkSlateGray','DarkSlateGrey','DarkTurquoise','DarkViolet','DeepPink','DeepSkyBlue','DimGray','DimGrey','DodgerBlue','FireBrick','FloralWhite','ForestGreen','Fuchsia','Gainsboro','GhostWhite','Gold','GoldenRod','Gray','Grey','Green','GreenYellow','HoneyDew','HotPink','IndianRed','Indigo','Ivory','Khaki','Lavender','LavenderBlush','LawnGreen','LemonChiffon','LightBlue','LightCoral','LightCyan','LightGoldenRodYellow','LightGray','LightGrey','LightGreen','LightPink','LightSalmon','LightSeaGreen','LightSkyBlue','LightSlateGray','LightSlateGrey','LightSteelBlue','LightYellow','Lime','LimeGreen','Linen','Magenta','Maroon','MediumAquaMarine','MediumBlue','MediumOrchid','MediumPurple','MediumSeaGreen','MediumSlateBlue','MediumSpringGreen','MediumTurquoise','MediumVioletRed','MidnightBlue','MintCream','MistyRose','Moccasin','NavajoWhite','Navy','OldLace','Olive','OliveDrab','Orange','OrangeRed','Orchid','PaleGoldenRod','PaleGreen','PaleTurquoise','PaleVioletRed','PapayaWhip','PeachPuff','Peru','Pink','Plum','PowderBlue','Purple','RebeccaPurple','Red','RosyBrown','RoyalBlue','SaddleBrown','Salmon','SandyBrown','SeaGreen','SeaShell','Sienna','Silver','SkyBlue','SlateBlue','SlateGray','SlateGrey','Snow','SpringGreen','SteelBlue','Tan','Teal','Thistle','Tomato','Turquoise','Violet','Wheat','White','WhiteSmoke','Yellow','YellowGreen']; }
  if (x == "hexs") {return ['f0f8ff','faebd7','00ffff','7fffd4','f0ffff','f5f5dc','ffe4c4','000000','ffebcd','0000ff','8a2be2','a52a2a','deb887','5f9ea0','7fff00','d2691e','ff7f50','6495ed','fff8dc','dc143c','00ffff','00008b','008b8b','b8860b','a9a9a9','a9a9a9','006400','bdb76b','8b008b','556b2f','ff8c00','9932cc','8b0000','e9967a','8fbc8f','483d8b','2f4f4f','2f4f4f','00ced1','9400d3','ff1493','00bfff','696969','696969','1e90ff','b22222','fffaf0','228b22','ff00ff','dcdcdc','f8f8ff','ffd700','daa520','808080','808080','008000','adff2f','f0fff0','ff69b4','cd5c5c','4b0082','fffff0','f0e68c','e6e6fa','fff0f5','7cfc00','fffacd','add8e6','f08080','e0ffff','fafad2','d3d3d3','d3d3d3','90ee90','ffb6c1','ffa07a','20b2aa','87cefa','778899','778899','b0c4de','ffffe0','00ff00','32cd32','faf0e6','ff00ff','800000','66cdaa','0000cd','ba55d3','9370db','3cb371','7b68ee','00fa9a','48d1cc','c71585','191970','f5fffa','ffe4e1','ffe4b5','ffdead','000080','fdf5e6','808000','6b8e23','ffa500','ff4500','da70d6','eee8aa','98fb98','afeeee','db7093','ffefd5','ffdab9','cd853f','ffc0cb','dda0dd','b0e0e6','800080','663399','ff0000','bc8f8f','4169e1','8b4513','fa8072','f4a460','2e8b57','fff5ee','a0522d','c0c0c0','87ceeb','6a5acd','708090','708090','fffafa','00ff7f','4682b4','d2b48c','008080','d8bfd8','ff6347','40e0d0','ee82ee','f5deb3','ffffff','f5f5f5','ffff00','9acd32']; }
}
function roundDecimals(c) {
  c.red = Number(c.red.toFixed(0));
  c.green = Number(c.green.toFixed(0));
  c.blue = Number(c.blue.toFixed(0));
  c.hue = Number(c.hue.toFixed(0));
  c.sat = Number(c.sat.toFixed(2));
  c.lightness = Number(c.lightness.toFixed(2));
  c.whiteness = Number(c.whiteness.toFixed(2));
  c.blackness = Number(c.blackness.toFixed(2));
  c.cyan = Number(c.cyan.toFixed(2));  
  c.magenta = Number(c.magenta.toFixed(2));
  c.yellow = Number(c.yellow.toFixed(2));
  c.black = Number(c.black.toFixed(2));
  c.ncol = c.ncol.substr(0, 1) + Math.round(Number(c.ncol.substr(1)));
  c.opacity = Number(c.opacity.toFixed(2));
  return c;
}
function hslToRgb(hue, sat, light) {
  var t1, t2, r, g, b;
  hue = hue / 60;
  if ( light <= 0.5 ) {
    t2 = light * (sat + 1);
  } else {
    t2 = light + sat - (light * sat);
  }
  t1 = light * 2 - t2;
  r = hueToRgb(t1, t2, hue + 2) * 255;
  g = hueToRgb(t1, t2, hue) * 255;
  b = hueToRgb(t1, t2, hue - 2) * 255;
  return {r : r, g : g, b : b};
}
function hueToRgb(t1, t2, hue) {
  if (hue < 0) hue += 6;
  if (hue >= 6) hue -= 6;
  if (hue < 1) return (t2 - t1) * hue + t1;
  else if(hue < 3) return t2;
  else if(hue < 4) return (t2 - t1) * (4 - hue) + t1;
  else return t1;
}
function hwbToRgb(hue, white, black) {
  var i, rgb, rgbArr = [], tot;
  rgb = hslToRgb(hue, 1, 0.50);
  rgbArr[0] = rgb.r / 255;
  rgbArr[1] = rgb.g / 255;
  rgbArr[2] = rgb.b / 255;
  tot = white + black;
  if (tot > 1) {
    white = Number((white / tot).toFixed(2));
    black = Number((black / tot).toFixed(2));
  }
  for (i = 0; i < 3; i++) {
    rgbArr[i] *= (1 - (white) - (black));
    rgbArr[i] += (white);
    rgbArr[i] = Number(rgbArr[i] * 255);
  }
  return {r : rgbArr[0], g : rgbArr[1], b : rgbArr[2] };
}
function cmykToRgb(c, m, y, k) {
  var r, g, b;
  r = 255 - ((Math.min(1, c * (1 - k) + k)) * 255);
  g = 255 - ((Math.min(1, m * (1 - k) + k)) * 255);
  b = 255 - ((Math.min(1, y * (1 - k) + k)) * 255);
  return {r : r, g : g, b : b};
}
function ncolToRgb(ncol, white, black) {
  var letter, percent, h, w, b;
  h = ncol;
  if (isNaN(ncol.substr(0,1))) {
    letter = ncol.substr(0,1).toUpperCase();
    percent = ncol.substr(1);
    if (percent == "") {percent = 0;}
    percent = Number(percent);
    if (isNaN(percent)) {return false;}
    if (letter == "R") {h = 0 + (percent * 0.6);}
    if (letter == "Y") {h = 60 + (percent * 0.6);}
    if (letter == "G") {h = 120 + (percent * 0.6);}
    if (letter == "C") {h = 180 + (percent * 0.6);}
    if (letter == "B") {h = 240 + (percent * 0.6);}
    if (letter == "M") {h = 300 + (percent * 0.6);}
    if (letter == "W") {
      h = 0;
      white = 1 - (percent / 100);
      black = (percent / 100);
    }
  }
  return hwbToRgb(h, white, black);
}
function hueToNcol(hue) {
  while (hue >= 360) {
    hue = hue - 360;
  }
  if (hue < 60) {return "R" + (hue / 0.6); }
  if (hue < 120) {return "Y" + ((hue - 60) / 0.6); }
  if (hue < 180) {return "G" + ((hue - 120) / 0.6); }
  if (hue < 240) {return "C" + ((hue - 180) / 0.6); }
  if (hue < 300) {return "B" + ((hue - 240) / 0.6); }
  if (hue < 360) {return "M" + ((hue - 300) / 0.6); }
}
function ncsToRgb(ncs){
  var black, chroma, bc, percent, black1, chroma1, red1, factor1, blue1, red1, red2, green2, blue2, max, factor2, grey, r, g, b; 
  ncs = w3trim(ncs).toUpperCase();
  ncs = ncs.replace("(", "");
  ncs = ncs.replace(")", "");
  ncs = ncs.replace("NCS", "NCS ");
  ncs = ncs.replace(/  /g, " ");  
  if (ncs.indexOf("NCS") == -1) {ncs = "NCS " + ncs;}
  ncs = ncs.match(/^(?:NCS|NCS\sS)\s(\d{2})(\d{2})-(N|[A-Z])(\d{2})?([A-Z])?$/);
  if (ncs === null) return false;
  black = parseInt(ncs[1], 10);
  chroma = parseInt(ncs[2], 10);
  bc = ncs[3];
  if (bc != "N" && bc != "Y" && bc != "R" && bc != "B" && bc != "G") {return false;}
  percent = parseInt(ncs[4], 10) || 0;
  if (bc !== 'N') {
    black1 = (1.05 * black - 5.25);
    chroma1 = chroma;
    if (bc === 'Y' && percent <= 60) {
      red1 = 1;
    } else if (( bc === 'Y' && percent > 60) || ( bc === 'R' && percent <= 80)) {
      if (bc === 'Y') {
        factor1 = percent - 60;
      } else {
        factor1 = percent + 40;
      }
      red1 = ((Math.sqrt(14884 - Math.pow(factor1, 2))) - 22) / 100;
    } else if ((bc === 'R' && percent > 80) || (bc === 'B')) {
      red1 = 0;
    } else if (bc === 'G') {
      factor1 = (percent - 170);
      red1 = ((Math.sqrt(33800 - Math.pow(factor1, 2))) - 70) / 100;
    }
    if (bc === 'Y' && percent <= 80) {
      blue1 = 0;
    } else if (( bc === 'Y' && percent > 80) || ( bc === 'R' && percent <= 60)) {
      if (bc ==='Y') {
        factor1 = (percent - 80) + 20.5;
      } else {
        factor1 = (percent + 20) + 20.5;
      }
      blue1 = (104 - (Math.sqrt(11236 - Math.pow(factor1, 2)))) / 100;
    } else if ((bc === 'R' && percent > 60) || ( bc === 'B' && percent <= 80)) {
      if (bc ==='R') {
        factor1 = (percent - 60) - 60;
      } else {
        factor1 = (percent + 40) - 60;
      }
      blue1 = ((Math.sqrt(10000 - Math.pow(factor1, 2))) - 10) / 100;
    } else if (( bc === 'B' && percent > 80) || ( bc === 'G' && percent <= 40)) {
      if (bc === 'B') {
        factor1 = (percent - 80) - 131;
      } else {
        factor1 = (percent + 20) - 131;
      }
      blue1 = (122 - (Math.sqrt(19881 - Math.pow(factor1, 2)))) / 100;
    } else if (bc === 'G' && percent > 40) {
      blue1 = 0;
    }
    if (bc === 'Y') {
      green1 = (85 - 17/20 * percent) / 100;
    } else if (bc === 'R' && percent <= 60) {
      green1 = 0;
    } else if (bc === 'R' && percent > 60) {
      factor1 = (percent - 60) + 35;
      green1 = (67.5 - (Math.sqrt(5776 - Math.pow(factor1, 2)))) / 100;
    } else if (bc === 'B' && percent <= 60) {
      factor1 = (1*percent - 68.5);
      green1 = (6.5 + (Math.sqrt(7044.5 - Math.pow(factor1, 2)))) / 100;
    } else if ((bc === 'B' && percent > 60) || ( bc === 'G' && percent <= 60)) {
      green1 = 0.9;
    } else if (bc === 'G' && percent > 60) {
      factor1 = (percent - 60);
      green1 = (90 - (1/8 * factor1)) / 100;
    }
    factor1 = (red1 + green1 + blue1)/3;
    red2 = ((factor1 - red1) * (100 - chroma1) / 100) + red1;
    green2 = ((factor1 - green1) * (100 - chroma1) / 100) + green1;
    blue2 = ((factor1 - blue1) * (100 - chroma1) / 100) + blue1;
    if (red2 > green2 && red2 > blue2) {
      max = red2;
    } else if (green2 > red2 && green2 > blue2) {
      max = green2;
    } else if (blue2 > red2 && blue2 > green2) {
      max = blue2;
    } else {
      max = (red2 + green2 + blue2) / 3;
    }
    factor2 = 1 / max;
    r = parseInt((red2 * factor2 * (100 - black1) / 100) * 255, 10);
    g = parseInt((green2 * factor2 * (100 - black1) / 100) * 255, 10);
    b = parseInt((blue2 * factor2 * (100 - black1) / 100) * 255, 10);
    if (r > 255) {r = 255;}
    if (g > 255) {g = 255;}
    if (b > 255) {b = 255;}
    if (r < 0) {r = 0;}
    if (g < 0) {g = 0;}
    if (b < 0) {b = 0;}
  } else {
    grey = parseInt((1 - black / 100) * 255, 10);
    if (grey > 255) {grey = 255;}
    if (grey < 0) {grey = 0;}
    r = grey;
    g = grey;
    b = grey;
  }
  return {
    r : r,
    g : g,
    b : b
  };
}
function rgbToHsl(r, g, b) {
  var min, max, i, l, s, maxcolor, h, rgb = [];
  rgb[0] = r / 255;
  rgb[1] = g / 255;
  rgb[2] = b / 255;
  min = rgb[0];
  max = rgb[0];
  maxcolor = 0;
  for (i = 0; i < rgb.length - 1; i++) {
    if (rgb[i + 1] <= min) {min = rgb[i + 1];}
    if (rgb[i + 1] >= max) {max = rgb[i + 1];maxcolor = i + 1;}
  }
  if (maxcolor == 0) {
    h = (rgb[1] - rgb[2]) / (max - min);
  }
  if (maxcolor == 1) {
    h = 2 + (rgb[2] - rgb[0]) / (max - min);
  }
  if (maxcolor == 2) {
    h = 4 + (rgb[0] - rgb[1]) / (max - min);
  }
  if (isNaN(h)) {h = 0;}
  h = h * 60;
  if (h < 0) {h = h + 360; }
  l = (min + max) / 2;
  if (min == max) {
    s = 0;
  } else {
    if (l < 0.5) {
      s = (max - min) / (max + min);
    } else {
      s = (max - min) / (2 - max - min);
    }
  }
  s = s;
  return {h : h, s : s, l : l};
}
function rgbToHwb(r, g, b) {
  var h, w, bl;
  r = r / 255;
  g = g / 255;
  b = b / 255;
  max = Math.max(r, g, b);
  min = Math.min(r, g, b);
  chroma = max - min;
  if (chroma == 0) {
    h = 0;
  } else if (r == max) {
    h = (((g - b) / chroma) % 6) * 360;
  } else if (g == max) {
    h = ((((b - r) / chroma) + 2) % 6) * 360;
  } else {
    h = ((((r - g) / chroma) + 4) % 6) * 360;
  }
  w = min;
  bl = 1 - max;
  return {h : h, w : w, b : bl};
}
function rgbToCmyk(r, g, b) {
  var c, m, y, k;
  r = r / 255;
  g = g / 255;
  b = b / 255;
  max = Math.max(r, g, b);
  k = 1 - max;
  if (k == 1) {
    c = 0;
    m = 0;
    y = 0;
  } else {
    c = (1 - r - k) / (1 - k);
    m = (1 - g - k) / (1 - k);
    y = (1 - b - k) / (1 - k);
  }
  return {c : c, m : m, y : y, k : k};
}
function toHex(n) {
  var hex = n.toString(16);
  while (hex.length < 2) {hex = "0" + hex; }
  return hex;
}
function cl(x) {
  console.log(x);
}
function w3trim(x) {
  return x.replace(/^\s+|\s+$/g, '');
}
function isHex(x) {
  return ('0123456789ABCDEFabcdef'.indexOf(x) > -1);
}
window.w3color = w3color;

})();

function w3SetColorsByAttribute() {
  var z, i, att;
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    att = z[i].getAttribute("data-w3-color");
    if (att) {
      z[i].style.backgroundColor = w3color(att).toRgbString();      
    }
  }
}/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.3.6 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, https://github.com/requirejs/requirejs/blob/master/LICENSE
 */
var requirejs,require,define;!function(global,setTimeout){var req,s,head,baseElement,dataMain,src,interactiveScript,currentlyAddingScript,mainScript,subPath,version="2.3.6",commentRegExp=/\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/gm,cjsRequireRegExp=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,jsSuffixRegExp=/\.js$/,currDirRegExp=/^\.\//,op=Object.prototype,ostring=op.toString,hasOwn=op.hasOwnProperty,isBrowser=!("undefined"==typeof window||"undefined"==typeof navigator||!window.document),isWebWorker=!isBrowser&&"undefined"!=typeof importScripts,readyRegExp=isBrowser&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,defContextName="_",isOpera="undefined"!=typeof opera&&"[object Opera]"===opera.toString(),contexts={},cfg={},globalDefQueue=[],useInteractive=!1;function commentReplace(e,t){return t||""}function isFunction(e){return"[object Function]"===ostring.call(e)}function isArray(e){return"[object Array]"===ostring.call(e)}function each(e,t){var i;if(e)for(i=0;i<e.length&&(!e[i]||!t(e[i],i,e));i+=1);}function eachReverse(e,t){var i;if(e)for(i=e.length-1;-1<i&&(!e[i]||!t(e[i],i,e));i-=1);}function hasProp(e,t){return hasOwn.call(e,t)}function getOwn(e,t){return hasProp(e,t)&&e[t]}function eachProp(e,t){var i;for(i in e)if(hasProp(e,i)&&t(e[i],i))break}function mixin(i,e,r,n){return e&&eachProp(e,function(e,t){!r&&hasProp(i,t)||(!n||"object"!=typeof e||!e||isArray(e)||isFunction(e)||e instanceof RegExp?i[t]=e:(i[t]||(i[t]={}),mixin(i[t],e,r,n)))}),i}function bind(e,t){return function(){return t.apply(e,arguments)}}function scripts(){return document.getElementsByTagName("script")}function defaultOnError(e){throw e}function getGlobal(e){if(!e)return e;var t=global;return each(e.split("."),function(e){t=t[e]}),t}function makeError(e,t,i,r){var n=new Error(t+"\nhttps://requirejs.org/docs/errors.html#"+e);return n.requireType=e,n.requireModules=r,i&&(n.originalError=i),n}if(void 0===define){if(void 0!==requirejs){if(isFunction(requirejs))return;cfg=requirejs,requirejs=void 0}void 0===require||isFunction(require)||(cfg=require,require=void 0),req=requirejs=function(e,t,i,r){var n,o,a=defContextName;return isArray(e)||"string"==typeof e||(o=e,isArray(t)?(e=t,t=i,i=r):e=[]),o&&o.context&&(a=o.context),(n=getOwn(contexts,a))||(n=contexts[a]=req.s.newContext(a)),o&&n.configure(o),n.require(e,t,i)},req.config=function(e){return req(e)},req.nextTick=void 0!==setTimeout?function(e){setTimeout(e,4)}:function(e){e()},require||(require=req),req.version=version,req.jsExtRegExp=/^\/|:|\?|\.js$/,req.isBrowser=isBrowser,s=req.s={contexts:contexts,newContext:newContext},req({}),each(["toUrl","undef","defined","specified"],function(t){req[t]=function(){var e=contexts[defContextName];return e.require[t].apply(e,arguments)}}),isBrowser&&(head=s.head=document.getElementsByTagName("head")[0],baseElement=document.getElementsByTagName("base")[0],baseElement&&(head=s.head=baseElement.parentNode)),req.onError=defaultOnError,req.createNode=function(e,t,i){var r=e.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script");return r.type=e.scriptType||"text/javascript",r.charset="utf-8",r.async=!0,r},req.load=function(t,i,r){var e,n=t&&t.config||{};if(isBrowser)return(e=req.createNode(n,i,r)).setAttribute("data-requirecontext",t.contextName),e.setAttribute("data-requiremodule",i),!e.attachEvent||e.attachEvent.toString&&e.attachEvent.toString().indexOf("[native code")<0||isOpera?(e.addEventListener("load",t.onScriptLoad,!1),e.addEventListener("error",t.onScriptError,!1)):(useInteractive=!0,e.attachEvent("onreadystatechange",t.onScriptLoad)),e.src=r,n.onNodeCreated&&n.onNodeCreated(e,n,i,r),currentlyAddingScript=e,baseElement?head.insertBefore(e,baseElement):head.appendChild(e),currentlyAddingScript=null,e;if(isWebWorker)try{setTimeout(function(){},0),importScripts(r),t.completeLoad(i)}catch(e){t.onError(makeError("importscripts","importScripts failed for "+i+" at "+r,e,[i]))}},isBrowser&&!cfg.skipDataMain&&eachReverse(scripts(),function(e){if(head||(head=e.parentNode),dataMain=e.getAttribute("data-main"))return mainScript=dataMain,cfg.baseUrl||-1!==mainScript.indexOf("!")||(mainScript=(src=mainScript.split("/")).pop(),subPath=src.length?src.join("/")+"/":"./",cfg.baseUrl=subPath),mainScript=mainScript.replace(jsSuffixRegExp,""),req.jsExtRegExp.test(mainScript)&&(mainScript=dataMain),cfg.deps=cfg.deps?cfg.deps.concat(mainScript):[mainScript],!0}),define=function(e,i,t){var r,n;"string"!=typeof e&&(t=i,i=e,e=null),isArray(i)||(t=i,i=null),!i&&isFunction(t)&&(i=[],t.length&&(t.toString().replace(commentRegExp,commentReplace).replace(cjsRequireRegExp,function(e,t){i.push(t)}),i=(1===t.length?["require"]:["require","exports","module"]).concat(i))),useInteractive&&(r=currentlyAddingScript||getInteractiveScript())&&(e||(e=r.getAttribute("data-requiremodule")),n=contexts[r.getAttribute("data-requirecontext")]),n?(n.defQueue.push([e,i,t]),n.defQueueMap[e]=!0):globalDefQueue.push([e,i,t])},define.amd={jQuery:!0},req.exec=function(text){return eval(text)},req(cfg)}function newContext(u){var i,e,l,c,d,g={waitSeconds:7,baseUrl:"./",paths:{},bundles:{},pkgs:{},shim:{},config:{}},p={},f={},r={},h=[],m={},n={},v={},x=1,b=1;function q(e,t,i){var r,n,o,a,s,u,c,d,p,f,l=t&&t.split("/"),h=g.map,m=h&&h["*"];if(e&&(u=(e=e.split("/")).length-1,g.nodeIdCompat&&jsSuffixRegExp.test(e[u])&&(e[u]=e[u].replace(jsSuffixRegExp,"")),"."===e[0].charAt(0)&&l&&(e=l.slice(0,l.length-1).concat(e)),function(e){var t,i;for(t=0;t<e.length;t++)if("."===(i=e[t]))e.splice(t,1),t-=1;else if(".."===i){if(0===t||1===t&&".."===e[2]||".."===e[t-1])continue;0<t&&(e.splice(t-1,2),t-=2)}}(e),e=e.join("/")),i&&h&&(l||m)){e:for(o=(n=e.split("/")).length;0<o;o-=1){if(s=n.slice(0,o).join("/"),l)for(a=l.length;0<a;a-=1)if((r=getOwn(h,l.slice(0,a).join("/")))&&(r=getOwn(r,s))){c=r,d=o;break e}!p&&m&&getOwn(m,s)&&(p=getOwn(m,s),f=o)}!c&&p&&(c=p,d=f),c&&(n.splice(0,d,c),e=n.join("/"))}return getOwn(g.pkgs,e)||e}function E(t){isBrowser&&each(scripts(),function(e){if(e.getAttribute("data-requiremodule")===t&&e.getAttribute("data-requirecontext")===l.contextName)return e.parentNode.removeChild(e),!0})}function w(e){var t=getOwn(g.paths,e);if(t&&isArray(t)&&1<t.length)return t.shift(),l.require.undef(e),l.makeRequire(null,{skipMap:!0})([e]),!0}function y(e){var t,i=e?e.indexOf("!"):-1;return-1<i&&(t=e.substring(0,i),e=e.substring(i+1,e.length)),[t,e]}function S(e,t,i,r){var n,o,a,s,u=null,c=t?t.name:null,d=e,p=!0,f="";return e||(p=!1,e="_@r"+(x+=1)),u=(s=y(e))[0],e=s[1],u&&(u=q(u,c,r),o=getOwn(m,u)),e&&(u?f=i?e:o&&o.normalize?o.normalize(e,function(e){return q(e,c,r)}):-1===e.indexOf("!")?q(e,c,r):e:(u=(s=y(f=q(e,c,r)))[0],f=s[1],i=!0,n=l.nameToUrl(f))),{prefix:u,name:f,parentMap:t,unnormalized:!!(a=!u||o||i?"":"_unnormalized"+(b+=1)),url:n,originalName:d,isDefine:p,id:(u?u+"!"+f:f)+a}}function k(e){var t=e.id,i=getOwn(p,t);return i||(i=p[t]=new l.Module(e)),i}function M(e,t,i){var r=e.id,n=getOwn(p,r);!hasProp(m,r)||n&&!n.defineEmitComplete?(n=k(e)).error&&"error"===t?i(n.error):n.on(t,i):"defined"===t&&i(m[r])}function O(i,e){var t=i.requireModules,r=!1;e?e(i):(each(t,function(e){var t=getOwn(p,e);t&&(t.error=i,t.events.error&&(r=!0,t.emit("error",i)))}),r||req.onError(i))}function j(){globalDefQueue.length&&(each(globalDefQueue,function(e){var t=e[0];"string"==typeof t&&(l.defQueueMap[t]=!0),h.push(e)}),globalDefQueue=[])}function P(e){delete p[e],delete f[e]}function R(){var e,r,t=1e3*g.waitSeconds,n=t&&l.startTime+t<(new Date).getTime(),o=[],a=[],s=!1,u=!0;if(!i){if(i=!0,eachProp(f,function(e){var t=e.map,i=t.id;if(e.enabled&&(t.isDefine||a.push(e),!e.error))if(!e.inited&&n)w(i)?s=r=!0:(o.push(i),E(i));else if(!e.inited&&e.fetched&&t.isDefine&&(s=!0,!t.prefix))return u=!1}),n&&o.length)return(e=makeError("timeout","Load timeout for modules: "+o,null,o)).contextName=l.contextName,O(e);u&&each(a,function(e){!function n(o,a,s){var e=o.map.id;o.error?o.emit("error",o.error):(a[e]=!0,each(o.depMaps,function(e,t){var i=e.id,r=getOwn(p,i);!r||o.depMatched[t]||s[i]||(getOwn(a,i)?(o.defineDep(t,m[i]),o.check()):n(r,a,s))}),s[e]=!0)}(e,{},{})}),n&&!r||!s||!isBrowser&&!isWebWorker||d||(d=setTimeout(function(){d=0,R()},50)),i=!1}}function a(e){hasProp(m,e[0])||k(S(e[0],null,!0)).init(e[1],e[2])}function o(e,t,i,r){e.detachEvent&&!isOpera?r&&e.detachEvent(r,t):e.removeEventListener(i,t,!1)}function s(e){var t=e.currentTarget||e.srcElement;return o(t,l.onScriptLoad,"load","onreadystatechange"),o(t,l.onScriptError,"error"),{node:t,id:t&&t.getAttribute("data-requiremodule")}}function T(){var e;for(j();h.length;){if(null===(e=h.shift())[0])return O(makeError("mismatch","Mismatched anonymous define() module: "+e[e.length-1]));a(e)}l.defQueueMap={}}return c={require:function(e){return e.require?e.require:e.require=l.makeRequire(e.map)},exports:function(e){if(e.usingExports=!0,e.map.isDefine)return e.exports?m[e.map.id]=e.exports:e.exports=m[e.map.id]={}},module:function(e){return e.module?e.module:e.module={id:e.map.id,uri:e.map.url,config:function(){return getOwn(g.config,e.map.id)||{}},exports:e.exports||(e.exports={})}}},(e=function(e){this.events=getOwn(r,e.id)||{},this.map=e,this.shim=getOwn(g.shim,e.id),this.depExports=[],this.depMaps=[],this.depMatched=[],this.pluginMaps={},this.depCount=0}).prototype={init:function(e,t,i,r){r=r||{},this.inited||(this.factory=t,i?this.on("error",i):this.events.error&&(i=bind(this,function(e){this.emit("error",e)})),this.depMaps=e&&e.slice(0),this.errback=i,this.inited=!0,this.ignore=r.ignore,r.enabled||this.enabled?this.enable():this.check())},defineDep:function(e,t){this.depMatched[e]||(this.depMatched[e]=!0,this.depCount-=1,this.depExports[e]=t)},fetch:function(){if(!this.fetched){this.fetched=!0,l.startTime=(new Date).getTime();var e=this.map;if(!this.shim)return e.prefix?this.callPlugin():this.load();l.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],bind(this,function(){return e.prefix?this.callPlugin():this.load()}))}},load:function(){var e=this.map.url;n[e]||(n[e]=!0,l.load(this.map.id,e))},check:function(){if(this.enabled&&!this.enabling){var t,e,i=this.map.id,r=this.depExports,n=this.exports,o=this.factory;if(this.inited){if(this.error)this.emit("error",this.error);else if(!this.defining){if(this.defining=!0,this.depCount<1&&!this.defined){if(isFunction(o)){if(this.events.error&&this.map.isDefine||req.onError!==defaultOnError)try{n=l.execCb(i,o,r,n)}catch(e){t=e}else n=l.execCb(i,o,r,n);if(this.map.isDefine&&void 0===n&&((e=this.module)?n=e.exports:this.usingExports&&(n=this.exports)),t)return t.requireMap=this.map,t.requireModules=this.map.isDefine?[this.map.id]:null,t.requireType=this.map.isDefine?"define":"require",O(this.error=t)}else n=o;if(this.exports=n,this.map.isDefine&&!this.ignore&&(m[i]=n,req.onResourceLoad)){var a=[];each(this.depMaps,function(e){a.push(e.normalizedMap||e)}),req.onResourceLoad(l,this.map,a)}P(i),this.defined=!0}this.defining=!1,this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else hasProp(l.defQueueMap,i)||this.fetch()}},callPlugin:function(){var u=this.map,c=u.id,e=S(u.prefix);this.depMaps.push(e),M(e,"defined",bind(this,function(e){var o,t,i,r=getOwn(v,this.map.id),n=this.map.name,a=this.map.parentMap?this.map.parentMap.name:null,s=l.makeRequire(u.parentMap,{enableBuildCallback:!0});return this.map.unnormalized?(e.normalize&&(n=e.normalize(n,function(e){return q(e,a,!0)})||""),M(t=S(u.prefix+"!"+n,this.map.parentMap,!0),"defined",bind(this,function(e){this.map.normalizedMap=t,this.init([],function(){return e},null,{enabled:!0,ignore:!0})})),void((i=getOwn(p,t.id))&&(this.depMaps.push(t),this.events.error&&i.on("error",bind(this,function(e){this.emit("error",e)})),i.enable()))):r?(this.map.url=l.nameToUrl(r),void this.load()):((o=bind(this,function(e){this.init([],function(){return e},null,{enabled:!0})})).error=bind(this,function(e){this.inited=!0,(this.error=e).requireModules=[c],eachProp(p,function(e){0===e.map.id.indexOf(c+"_unnormalized")&&P(e.map.id)}),O(e)}),o.fromText=bind(this,function(e,t){var i=u.name,r=S(i),n=useInteractive;t&&(e=t),n&&(useInteractive=!1),k(r),hasProp(g.config,c)&&(g.config[i]=g.config[c]);try{req.exec(e)}catch(e){return O(makeError("fromtexteval","fromText eval for "+c+" failed: "+e,e,[c]))}n&&(useInteractive=!0),this.depMaps.push(r),l.completeLoad(i),s([i],o)}),void e.load(u.name,s,o,g))})),l.enable(e,this),this.pluginMaps[e.id]=e},enable:function(){(f[this.map.id]=this).enabled=!0,this.enabling=!0,each(this.depMaps,bind(this,function(e,t){var i,r,n;if("string"==typeof e){if(e=S(e,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap),this.depMaps[t]=e,n=getOwn(c,e.id))return void(this.depExports[t]=n(this));this.depCount+=1,M(e,"defined",bind(this,function(e){this.undefed||(this.defineDep(t,e),this.check())})),this.errback?M(e,"error",bind(this,this.errback)):this.events.error&&M(e,"error",bind(this,function(e){this.emit("error",e)}))}i=e.id,r=p[i],hasProp(c,i)||!r||r.enabled||l.enable(e,this)})),eachProp(this.pluginMaps,bind(this,function(e){var t=getOwn(p,e.id);t&&!t.enabled&&l.enable(e,this)})),this.enabling=!1,this.check()},on:function(e,t){var i=this.events[e];i||(i=this.events[e]=[]),i.push(t)},emit:function(e,t){each(this.events[e],function(e){e(t)}),"error"===e&&delete this.events[e]}},(l={config:g,contextName:u,registry:p,defined:m,urlFetched:n,defQueue:h,defQueueMap:{},Module:e,makeModuleMap:S,nextTick:req.nextTick,onError:O,configure:function(e){if(e.baseUrl&&"/"!==e.baseUrl.charAt(e.baseUrl.length-1)&&(e.baseUrl+="/"),"string"==typeof e.urlArgs){var i=e.urlArgs;e.urlArgs=function(e,t){return(-1===t.indexOf("?")?"?":"&")+i}}var r=g.shim,n={paths:!0,bundles:!0,config:!0,map:!0};eachProp(e,function(e,t){n[t]?(g[t]||(g[t]={}),mixin(g[t],e,!0,!0)):g[t]=e}),e.bundles&&eachProp(e.bundles,function(e,t){each(e,function(e){e!==t&&(v[e]=t)})}),e.shim&&(eachProp(e.shim,function(e,t){isArray(e)&&(e={deps:e}),!e.exports&&!e.init||e.exportsFn||(e.exportsFn=l.makeShimExports(e)),r[t]=e}),g.shim=r),e.packages&&each(e.packages,function(e){var t;t=(e="string"==typeof e?{name:e}:e).name,e.location&&(g.paths[t]=e.location),g.pkgs[t]=e.name+"/"+(e.main||"main").replace(currDirRegExp,"").replace(jsSuffixRegExp,"")}),eachProp(p,function(e,t){e.inited||e.map.unnormalized||(e.map=S(t,null,!0))}),(e.deps||e.callback)&&l.require(e.deps||[],e.callback)},makeShimExports:function(t){return function(){var e;return t.init&&(e=t.init.apply(global,arguments)),e||t.exports&&getGlobal(t.exports)}},makeRequire:function(o,a){function s(e,t,i){var r,n;return a.enableBuildCallback&&t&&isFunction(t)&&(t.__requireJsBuild=!0),"string"==typeof e?isFunction(t)?O(makeError("requireargs","Invalid require call"),i):o&&hasProp(c,e)?c[e](p[o.id]):req.get?req.get(l,e,o,s):(r=S(e,o,!1,!0).id,hasProp(m,r)?m[r]:O(makeError("notloaded",'Module name "'+r+'" has not been loaded yet for context: '+u+(o?"":". Use require([])")))):(T(),l.nextTick(function(){T(),(n=k(S(null,o))).skipMap=a.skipMap,n.init(e,t,i,{enabled:!0}),R()}),s)}return a=a||{},mixin(s,{isBrowser:isBrowser,toUrl:function(e){var t,i=e.lastIndexOf("."),r=e.split("/")[0];return-1!==i&&(!("."===r||".."===r)||1<i)&&(t=e.substring(i,e.length),e=e.substring(0,i)),l.nameToUrl(q(e,o&&o.id,!0),t,!0)},defined:function(e){return hasProp(m,S(e,o,!1,!0).id)},specified:function(e){return e=S(e,o,!1,!0).id,hasProp(m,e)||hasProp(p,e)}}),o||(s.undef=function(i){j();var e=S(i,o,!0),t=getOwn(p,i);t.undefed=!0,E(i),delete m[i],delete n[e.url],delete r[i],eachReverse(h,function(e,t){e[0]===i&&h.splice(t,1)}),delete l.defQueueMap[i],t&&(t.events.defined&&(r[i]=t.events),P(i))}),s},enable:function(e){getOwn(p,e.id)&&k(e).enable()},completeLoad:function(e){var t,i,r,n=getOwn(g.shim,e)||{},o=n.exports;for(j();h.length;){if(null===(i=h.shift())[0]){if(i[0]=e,t)break;t=!0}else i[0]===e&&(t=!0);a(i)}if(l.defQueueMap={},r=getOwn(p,e),!t&&!hasProp(m,e)&&r&&!r.inited){if(!(!g.enforceDefine||o&&getGlobal(o)))return w(e)?void 0:O(makeError("nodefine","No define call for "+e,null,[e]));a([e,n.deps||[],n.exportsFn])}R()},nameToUrl:function(e,t,i){var r,n,o,a,s,u,c=getOwn(g.pkgs,e);if(c&&(e=c),u=getOwn(v,e))return l.nameToUrl(u,t,i);if(req.jsExtRegExp.test(e))a=e+(t||"");else{for(r=g.paths,o=(n=e.split("/")).length;0<o;o-=1)if(s=getOwn(r,n.slice(0,o).join("/"))){isArray(s)&&(s=s[0]),n.splice(0,o,s);break}a=n.join("/"),a=("/"===(a+=t||(/^data\:|^blob\:|\?/.test(a)||i?"":".js")).charAt(0)||a.match(/^[\w\+\.\-]+:/)?"":g.baseUrl)+a}return g.urlArgs&&!/^blob\:/.test(a)?a+g.urlArgs(e,a):a},load:function(e,t){req.load(l,e,t)},execCb:function(e,t,i,r){return t.apply(r,i)},onScriptLoad:function(e){if("load"===e.type||readyRegExp.test((e.currentTarget||e.srcElement).readyState)){interactiveScript=null;var t=s(e);l.completeLoad(t.id)}},onScriptError:function(e){var i=s(e);if(!w(i.id)){var r=[];return eachProp(p,function(e,t){0!==t.indexOf("_@r")&&each(e.depMaps,function(e){if(e.id===i.id)return r.push(t),!0})}),O(makeError("scripterror",'Script error for "'+i.id+(r.length?'", needed by: '+r.join(", "):'"'),e,[i.id]))}}}).require=l.makeRequire(),l}function getInteractiveScript(){return interactiveScript&&"interactive"===interactiveScript.readyState||eachReverse(scripts(),function(e){if("interactive"===e.readyState)return interactiveScript=e}),interactiveScript}}(this,"undefined"==typeof setTimeout?void 0:setTimeout);
/* ------ module/_util.js ------*/

function percent(n) { return Math.round(n*100)+"%" }
function cssvar_input(what,value) { return "--"+what+":"+value+";" }
function cssvar_hsl(what,h,s,l) { return "--"+what+":hsl("+h+","+percent(s)+","+percent(l)+");" }
function trim(x) { return x.replace(/^\s+|\s+$/g, ''); }
function safe_str(x) { return x.replace(/^\s+|\s+$|\W/g, '').toLowerCase(); }
function quote(text) { return '"'+text.replace(/\"/ig,"'")+'"'; }
/* ------ module/common-click.js ------*/

function gn_toggle(ele,classes) {
	gas(ele).toggleClass(classes);
}


function clickControler() {
	
	document.querySelectorAll('.notices').forEach( function(el) {
	
		el.addEventListener("click", function(e) {
			el.remove()
		})
		
	});
	
	document.querySelectorAll('.alert').forEach( function(el) {
	
		el.addEventListener("click", function(e) {
			el.remove()
		})
		
	});	
	
}
/* ------ module/construct-style.js ------*/

function construct_styles() {

	document.querySelectorAll('.hsl-pal').forEach( function(el) {
		if (!el.id) {
			el.id = 'color-'+ String(Math.floor((Math.random() * 999) + 1)).padStart(3,'0');
		}
		var id = el.id
		ncc_construct_pallete('#'+id);
	});

}

function ncc_construct_pallete(q) {

	if (!gas(q)) { return false; }
	
	var color = gas(q).cssvar('color')
	
	var c = w3color( color );
	var h = c.hue
	var s = c.sat
	var l = c.lightness	
	
	cstyle = q +" {";
	cstyle += cssvar_input("h",h+"");	
	cstyle += cssvar_input("s",percent(s));	
	cstyle += cssvar_input("l",percent(l));
	cstyle += cssvar_hsl("b",h,s,0.03);
	cstyle += cssvar_hsl("c",h,s,l);
	cstyle += cssvar_hsl("w",h,s,0.97);
	
	var uf = (0.95-l)/5;	
	var df = (l-0.05)/5;	
	cstyle += cssvar_input("df",percent(df));
	cstyle += cssvar_input("uf",percent(uf));

	if (l <= 0.5) {
		cstyle += cssvar_input("t","var(--w)");
	} else {
		cstyle += cssvar_input("t","var(--b)");
	}
	
	console.log(q);
	console.log(color);
	console.log(cstyle);
	
	gas(q).cssConstruct(cstyle)
	
}

/* ------ module/modular-slide.js ------*/

function gn_modular_slideshow(ele,sec=15) {

	var r = gas(ele); 

	if (r) {
		var sec = r.data('delay')
		window.value = 0
		console.log(sec);
		setInterval(function(){ 
			gn_modular_slideshow_func(r);
		}, sec*1000 );
	}
}

function gn_modular_slideshow_func(r) {
	var images = r.data('image').split(",");
	window.value = window.value + 1;
	if (window.value == images.length) { window.value = 0; }
	console.log(window.value,images[window.value])
	r.style('backgroundImage','url('+images[window.value]+')');
}

/* ------ module/res-ctl.js ------*/


function responsiveControler() {

	document.querySelectorAll('.res-ctl').forEach( function(el) {

		var block = el.closest('.g-block')
		gas(block).cssvar('ctl-width', gas(el).data('ctl-width') );
		gas(block).cssvar('ctl-height', gas(el).data('ctl-height') );
		if ( gas(el).data('responsive') )  { gas(block).addClass('desktop'); }
		gas( gas(el).data('target') ).addClass('responsive-block');

        var element = el.cloneNode(true);
		block.prepend(element)
		el.remove();

		element.addEventListener("click", function(e) {
			var target=gas(element).data('target');
			gas(target).toggleClass('show');
		});

	});

}



/* ------ module/scheme.js ------*/



function ncc_scheme_switch(ele=false) {
	
	if (gas('body').hasClass('dark-scheme')) {
		gas('body').removeClass('dark-scheme');
		gas('body').addClass('light-scheme');
	} else {
		gas('body').removeClass('light-scheme');
		gas('body').addClass('dark-scheme');
	}
}	

function ncc_scheme_actived() {
	if (document.querySelector('#ncc_scheme_switch')) {
		
		console.log('ada');
		//store selected scheme
		document.querySelector('#ncc_scheme_switch').addEventListener("click", function(e) {
			console.log('ada-click');
			if (gas('body').hasClass('dark-scheme')) {
				localStorage.setItem('ncc-scheme','dark');
			} else {
				localStorage.setItem('ncc-scheme','light');
			}
		})
	}
}
	
function preferScheme() {

	if (disable_scheme) {
		gas('body').addClass('light-scheme');
		localStorage.setItem('ncc-scheme','light')
		var scheme = 'light';
	}

	
	var prefer_scheme = localStorage.getItem('ncc-scheme');

    if (!prefer_scheme) {

	    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		    var scheme = 'dark';
		    gas('body').addClass('dark-scheme');
	    } else {
		    var scheme = 'light';
		    gas('body').addClass('light-scheme');
	    }

	} else {

		console.log('stored prefer scheme:'+ prefer_scheme)

        if (prefer_scheme == 'dark') {
		    gas('body').addClass('dark-scheme');
        } else {
		    gas('body').addClass('light-scheme');
        }


	}

}