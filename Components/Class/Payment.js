/* eslint-disable no-undef */
import axios from 'react-native-axios';
export default class PaymentFunctions {
  url = 'https://qandilafa.000webhostapp.com/index.php';

  async stripeCharge(token, amount, description) {
    // eslint-disable-next-line no-undef
    var formData = new URLSearchParams();
    formData.append('req', 'stripePayment');
    formData.append('checkKey', 'hassantBuildKey1');
    formData.append('stripeToken', token);
    formData.append('amount', amount);
    formData.append('description', description);
    axios
      .get(this.url, formData)
      .then(function(response) {
        console.log(response);
        return response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  async getPaypalURL(cost, success, cancel, error = 'null') {
    var formData = {};
    formData.req = 'paypalPaymentGetLink';
    formData.cost = cost;
    formData.checkKey = 'hassantBuildKey1';
    formData.successUrl = success;
    formData.cancelUrl = cancel;
    formData.errorUrl = error;
    var data = await axios({
      method: 'get',
      url: this.url,
      params: formData,
    });
    return data;
  }
}
