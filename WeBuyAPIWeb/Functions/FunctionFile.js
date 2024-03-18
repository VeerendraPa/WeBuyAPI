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



function replyToEmail() {
    // Fetch data from your proxy server
    fetch('http://localhost:3000/proxy', { // Update the URL with your proxy server URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // No need to set Origin header as the request is now going to your own domain
        },
        body: JSON.stringify({
            //user_input: 'Test Email',
            user_input:"Hi", // Pass the email text as user input
            thread_id: ''

        }),
    })
        .then(response => response.json())
        .then(data => {
            // Get information about the current email
            var currentEmail = Office.context.mailbox.item;

            // Create the reply response message with API-generated data
            var options = {
                'htmlBody': `Generated Text: ${data.text}`, // Set the response text as the email body
                'options': { 'allowExternalImages': true } // Include additional options if needed
            };
            // Display the reply form
            Office.context.mailbox.item.displayReplyAllForm(options);

            // Optionally, you can perform additional actions after the reply form is displayed
            // For example, you might want to log that the user initiated a reply
            /*console.log("User initiated a reply to the email.");*/

            // Close the reply form
            /*Office.context.mailbox.item.close();*/
            console.log("Request body", user_input);
        })
        .catch(error => {
            console.error('Error fetching data from proxy server:', error);

            // Handle errors as needed
        });
}

//function regenerateResponse() {
//    // Fetch data from your proxy server
//    fetch('http://localhost:3000/proxy', { // Update the URL with your proxy server URL
//        method: 'POST',
//        headers: {
//            'Content-Type': 'application/json',
//            // No need to set Origin header as the request is now going to your own domain
//        },
//        body: JSON.stringify({
//            user_input: 'Hi',
//            thread_id: ''
//        }),
//    })
//        .then(response => response.json())
//        .then(data => {
//            // Get information about the current email
//            var currentEmail = Office.context.mailbox.item;

//            // Create the reply response message with API-generated data
//            var options = {
//                'htmlBody': `Generated Text: ${data.text}`, // Set the response text as the email body
//                'options': { 'allowExternalImages': true } // Include additional options if needed
//            };
//            // Close the reply form
//            Office.context.mailbox.item.close();
//        })
//        .catch(error => {
//            console.error('Error fetching data from proxy server:', error);

//            // Handle errors as needed
//        });
//}