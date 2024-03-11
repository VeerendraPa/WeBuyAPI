Office.initialize = function () {
}

 //Helper function to add a status message to the info bar.
function statusUpdate(icon, text) {
  Office.context.mailbox.item.notificationMessages.replaceAsync("status", {
    type: "informationalMessage",
    icon: icon,
    message: text,
    persistent: false
  });
}

function defaultStatus(event) {
  statusUpdate("icon16" , "Hello World!");
}

//function replyToEmail() {
//    // Get information about the current email
//    var currentEmail = Office.context.mailbox.item;

//    // Create the reply response message
//    var options = {
//        'htmlBody': 'This is the message body of the email reply.',
//        'options': { 'allowExternalImages': true } // Include additional options if needed
//    };

//    // Display the reply form
//    Office.context.mailbox.item.displayReplyAllForm(options);

//    // Optionally, you can perform additional actions after the reply form is displayed
//    // For example, you might want to log that the user initiated a reply
//    /*console.log("User initiated a reply to the email.");*/

//    // Close the reply form
//    Office.context.mailbox.item.close();
//}

  // Function to initiate reply to email with fetched data
  function replyToEmail() {
      // Fetch data from the proxy server
      fetch('http://localhost:3000/proxy')
          .then(response => response.json())
          .then(data => {
              // Get information about the current email
              var currentEmail = Office.context.mailbox.item;
  
              // Create the reply response message with API data
              var options = {
                  'htmlBody': JSON.stringify(data),
                  'options': { 'allowExternalImages': true } // Include additional options if needed
              };
  
              // Display the reply form
              Office.context.mailbox.item.displayReplyAllForm(options);
  
              // Optionally, you can perform additional actions after the reply form is displayed
              // For example, you might want to log that the user initiated a reply
              /*console.log("User initiated a reply to the email.");*/
  
              // Close the reply form
              Office.context.mailbox.item.close();
          })
          .catch(error => {
              console.error('Error fetching data:', error);
              // Handle errors as needed
          });
  }
 
  