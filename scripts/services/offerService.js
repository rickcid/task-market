var app = angular.module('TaskMarketApp');

app.factory('Offer', function(FURL, $firebase, $q, Auth) {

  var ref = new Firebase(FURL);
  var user = Auth.user;

  var Offer = {

    offers: function(taskId) {
      return $firebase(ref.child('offers').child(taskId)).$asArray();
    },

    makeOffer: function(taskId, offer) {
      var task_offers = this.offers(taskId);

      if(task_offers) {
        return task_offers.$add(offer);
      }
    },

    isOfferred: function(taskId) {
      if(user && user.provider) {
        var d = $q.defer();

        $firebase(ref.child('offers').child(taskId).orderByChild("uid")
          .equalTo(user.uid))
          .$asArray()
          .$loaded().then(function(data) {            
            d.resolve(data.length > 0);
          }, function() {
            d.reject(false);
          });

        return d.promise;
      }  
    },

    //checks if the current user is making the offer
    isMaker: function(offer) {
      return (user && user.provider && user.uid === offer.uid);
    },

    //gets the offer based on the taskId and offerId from firebase
    getOffer: function(taskId, offerId) {
      return $firebase(ref.child('offers').child(taskId).child(offerId));
    },

    //once you have an offer object, remove it from the database
    cancelOffer: function(taskId, offerId) {
      return this.getOffer(taskId, offerId).$remove();      
    }


  };

  return Offer;


});