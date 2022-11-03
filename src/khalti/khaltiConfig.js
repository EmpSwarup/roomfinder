
import my_key from './khaltiKey';
import { toast } from "react-toastify";
import axios from 'axios'

let config = {
    // replace this key with yours
    "publicKey": my_key.publicTestKey,
    "productIdentity": "1234567890",
    "productName": "Drogon",
    "productUrl": "http://gameofthrones.com/buy/Dragons",
    "eventHandler": {
        onSuccess (payload) {
            // hit merchant api for initiating verfication
            toast.success("Payment Successful!");
            let data = {
                "token": payload.token,
                "amount": payload.amount
            };
            
          
            
            axios.get(`https://meslaforum.herokuapp.com/khalti/${data.token}/${data.amount}/${my_key.secretKey}`)
                .then(response => {
                    // add the romm id to user in firebase
                    
                    console.log(response.data);
                   
                })
                .catch(error => {
                    console.log(error);
                });
          //  alert('Payment Successful')
            console.log(payload);
        },
        // onError handler is optional
        onError (error) {
            // handle errors
            console.log(error);
        },
        onClose () {
            console.log('widget is closing');
        }
    },
    "paymentPreference": ["KHALTI", "EBANKING","MOBILE_BANKING", "CONNECT_IPS", "SCT"],
};

export default config;