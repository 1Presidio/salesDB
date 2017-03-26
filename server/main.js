import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Files.allow({
  download: function () {
    return true;
  },
  fetch: null
});
