const mailtoLink = document.querySelectorAll('[data-scrambled-email-link]')[0];
mailtoLink.href =
    'mailto:' + window.emailScramble.decode(mailtoLink.href.replace('mailto:', ''));

const phoneLink = document.querySelectorAll('[data-scrambled-phone-link]')[0];
phoneLink.href =
    'tel:' + window.emailScramble.decode(phoneLink.href.replace('tel:', ''));