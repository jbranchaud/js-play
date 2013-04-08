/*
 * assert.js
 *
 * a small script to add support for assertions in JavaScript
 */

(function(global) {

    // seems good to use strict
    'use strict';

    // Constructor for Assert
    function Assert() {};

    /*
     * assertTrue: expression -> void
     * given some expression, this function will determine if that
     * expression is true or false. If it is true, then the function will
     * return normally because the assertion has held. However, if the
     * expression is false, then the function will throw an error for an
     * assertion violation.
     */
    Assert.prototype.assertTrue = function( expression, msg ) {
   
        var message = msg;
        if( message == null || typeof message === 'undefined' ) {
            message = "";
        }
        
        // check the expression and throw an error if it is false
        if( expression != true) {
            var errorMessage = "Assert.assertTrue: assertion violated";
            if(message != "") {
                errorMessage = errorMessage + " - " + message;
            }
            throw new Error(errorMessage);
        }
        
        return;
    };

    global['Assert'] = new Assert();

})( this );
