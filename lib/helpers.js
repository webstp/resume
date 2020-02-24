var HandlerBars = require('handlebars')
var moment = require('moment')
var Handlebars = require('handlebars')
var encode = require('email-scramble').encode;

var parseText = function(text, pattern, replacement, lowercase) {
    text = Handlebars.escapeExpression(text || '');
    text = text.replace(pattern, replacement);
    text = !!lowercase ? text.toLowerCase() : text;
    return new Handlebars.SafeString(text);
};

var formatDate = function(date, format) {
  date = Handlebars.escapeExpression(date || '');
  date = moment(date).format(format);
  return new Handlebars.SafeString(date);
};

module.exports = {
    toLowerCase: function(str) {
        return str.toLowerCase()
    },
    sanitizeUrl: function(url) {
        return parseText(url, /http?s:\/\//g, '', true);
    },
    obfuscateText: function(html) {
        html = Handlebars.escapeExpression(html || '');
        html = html.substring(0, 4) + '<span style="display:none;">1337</span>' + html.substring(4);
        return new Handlebars.SafeString(html);
    },
    scrambleText: function(text) {
        text = Handlebars.escapeExpression(text || '');
        text = encode(text);
        return new Handlebars.SafeString(text);
    },
    scramblePhone: function(phone) {
        return encode(parseText(phone, /[-\s]/g, '', true));
    },
    mapUrl: function(location) {
      var googleMaps = 'https://www.google.com/maps?q=';
      var fields = [
          Handlebars.escapeExpression(location.address || ''),
          Handlebars.escapeExpression(location.postalCode || ''),
          Handlebars.escapeExpression(location.city || ''),
          Handlebars.escapeExpression(location.region || ''),
          Handlebars.escapeExpression(location.countryCode || '')
      ];
      return new Handlebars.SafeString(googleMaps + encodeURIComponent(fields.join(' ').replace(/\s+/g, ' ')));
    },
    formatDate: function(date) {
      return formatDate(date, 'MMMM YYYY');
    },
    year: function(date) {
        return date
    },
    skillLevel: function(lvl) {
        return lvl
    }
}