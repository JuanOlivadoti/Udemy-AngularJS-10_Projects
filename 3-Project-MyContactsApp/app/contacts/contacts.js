angular.module('myContacts.contacts', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

// Contacts Controller
.controller('ContactsCtrl', ['$scope', '$firebaseArray', '$firebaseObject', function($scope, $firebaseArray, $firebaseObject) {

  var addContact = {
    name: null,
    email: null,
    company: null,
    phones: [
      {
        mobile_phone: null,
        home_phone: null,
        work_phone: null
      }
    ],
    address: [
      {
        street_address: null,
        city: null,
        state: null,
        zipcode: null
      }
    ]
  }

  var ref = firebase.database().ref();
  // create a synchronized array
  // click on `index.html` above to see it used in the DOM!
  $scope.contacts = $firebaseArray(ref);

  $scope.showAddForm = function(){
    $scope.addFormShow = true;
  }

  $scope.hide = function(){
    $scope.addFormShow = false;
  }

  $scope.addFormSubmit = function() {
    console.log('Adding contact...')

    addContact = {
      name: $scope.newContact.name || "none",
      email: $scope.newContact.email || "none",
      company: $scope.newContact.company || "none",
      phones: [
        {
          mobile_phone: $scope.newContact.mobile_phone || "none",
          home_phone: $scope.newContact.home_phone || "none",
          work_phone: $scope.newContact.work_phone || "none"
        }
      ],
      address: [
        {
          street_address: $scope.newContact.street_address || "none",
          city: $scope.newContact.city || "none",
          state: $scope.newContact.state || "none",
          zipcode: $scope.newContact.zipcode || "none"
        }
      ]
    }

    $scope.contacts.$add(addContact)

      // Clear the form
      clearFields();

      $scope.addFormShow = false;

      // Send Message
      $scope.msg = "Contact Added";

      console.log(addContact)

  }

  $scope.showContact = function(ct){
    console.log('getting contact')
// debugger
    $scope.name =             ct.name || "none";
    $scope.email =            ct.email || "none";
    $scope.company =          ct.company || "none";
    $scope.city =             ct.address[0].city || "none";
    $scope.state =            ct.address[0].state || "none";
    $scope.zipcode =          ct.address[0].zipcode || "none";

    console.log(ct)

    $scope.contactShow = true;

  }

  // Clear $scope Fields
  function clearFields(){
    console.log('Clearing All Fields...');

    $scope.newContact.name = '';
    $scope.newContact.email = '';
    $scope.newContact.company = '';
    $scope.newContact.mobile_phone = '';
    $scope.newContact.home_phone = '';
    $scope.newContact.work_phone = '';
    $scope.newContact.street_address = '';
    $scope.newContact.city = '';
    $scope.newContact.state = '';
    $scope.newContact.zipcode = '';
  }
}])
