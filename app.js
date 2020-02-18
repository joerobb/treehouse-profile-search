// The process.argv property returns an array containing the command line arguments passed when the Node.js process was launched.
// the slice() method cuts out the first 2 uneeded pats of the array - we are only interested in the user names.

const profile = require('./profile');
const users = process.argv.slice(2);

users.forEach(profile.get);
