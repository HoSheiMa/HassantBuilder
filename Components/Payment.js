/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {WebView} from 'react-native-webview';

const fw = Dimensions.get('screen').width;

import {Icon} from 'react-native-elements';

import {BoxShadow} from 'react-native-shadow';

const fh = Dimensions.get('screen').height;

import stripe from 'tipsi-stripe';

import PaymentFunctions from './Class/Payment';

const PaymentFunction = new PaymentFunctions();

export default class Payment extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    donate: this.props.navigation.getParam('donate'),
    options: this.props.navigation.getParam('options'),
    activeItems: [],
    showOptions: true,
    showPaypalPage: false,
    paypalURL: null,
  };

  clacMixOfDonate = donates => {
    var value = 0;
    for (var i in donates) {
      var donate = parseInt(donates[i]);
      if (donate === 0) {
        continue;
      }
      value = value + donate;
    }
    return value;
  };

  async componentDidMount() {
    stripe.setOptions({
      publishableKey: 'pk_test_7LQYCqTOI5bsvbOJILKqE0ZU00VTQ2WGZx',
      merchantId: 'MERCHANT_ID', // Optional
      androidPayMode: 'test', // Android only
    });

    var activeItems = [];

    for (var i in this.state.donate) {
      if (parseInt(this.state.donate[i]) === 0) {
        continue;
      }
      activeItems.push({
        title: this.state.options[i].title,
        donate: this.state.donate[i],
      });
    }
    this.setState({
      activeItems: activeItems,
    });
  }
  Getdescription = () => {
    var des = 'Donate for ';
    for (var i in this.state.donate) {
      if (parseInt(this.state.donate[i]) == 0) {
        continue;
      }
      des += this.state.options[i].title + ', ';
    }
    return des;
  };
  VisaAndMasterCard = async () => {
    // console.log(this.state.activeItems);
    // Native Stripe
    const options = {
      requiredBillingAddressFields: 'full',
    };
    const token = await stripe.paymentRequestWithCardForm(options);

    console.log(
      await PaymentFunction.stripeCharge(
        token,
        this.clacMixOfDonate(this.state.donate),
        this.Getdescription(),
      ),
    );
  };
  Googlepay = async () => {
    console.log('sad');
    // Gpay
    const options = {
      total_price: '80.00',
      currency_code: 'USD',
      shipping_address_required: false,
      billing_address_required: true,
      livemode: false,
      shipping_countries: ['US', 'CA'],
      line_items: [
        {
          currency_code: 'USD',
          description: 'Test',
          total_price: '1.00',
          unit_price: '1.00',
          quantity: '1',
        },
      ],
    };
    const token = await stripe.paymentRequestWithAndroidPay(options);
  };
  ApplePay = async () => {
    console.log(await stripe.canMakeApplePayPayments());
  };
  Paypal = async () => {
    var url = 'https://qandilafa.000webhostapp.com/index.php';
    var successUrl =
      url + '?req=message&checkKey=hassantBuildKey1&state=success';
    var cancelUrl = url + '?req=message&checkKey=hassantBuildKey1&state=cancel';

    var paypalURL = await PaymentFunction.getPaypalURL(
      this.clacMixOfDonate(this.state.donate),
      successUrl,
      cancelUrl,
    );
    this.setState({
      showOptions: false,
      showPaypalPage: true,
      paypalURL: paypalURL.data.link,
    });
  };
  WebSidePayment = () => {};
  GetDonateValue() {}
  renderNav() {
    return (
      <View style={styles.nav}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.navigation.pop();
          }}>
          <View>
            <ImageBackground
              style={styles.nav_lsit}
              source={require('./../assets/left-arrow.png')}
            />
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.nav_Logo}> LOGO </Text>
      </View>
    );
  }

  renderPaymentButton({title, logo, onpress}) {
    return (
      <TouchableOpacity
        onPress={onpress}
        style={{
          marginTop: 4,
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <BoxShadow
            setting={{
              border: 8,
              radius: 4,
              opacity: 0.1,
              color: '#000',
              width: 225,
              height: 55,

              style: {
                justifyContent: 'center',
                alignItems: 'center',
                margin: 5,
              },
            }}>
            <View
              style={{
                width: 220,
                height: 50,
                borderRadius: 4,
                backgroundColor: '#fff',
                margin: 5,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                flexDirection: 'row',
              }}>
              <ImageBackground
                style={{
                  width: 30,
                  height: 30,
                  margin: 4,
                }}
                source={logo}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                }}>
                {title}
              </Text>
            </View>
          </BoxShadow>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <ScrollView>
        {this.renderNav()}
        {this.state.showOptions ? (
          <View>
            <Text style={styles.title}>payment methods</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <ImageBackground
                source={require('./../assets/PaymentAssets/love.png')}
                style={{
                  width: 20,
                  height: 20,
                  margin: 4,
                }}
              />
              <Text>Donate with</Text>
            </View>
            {this.renderPaymentButton({
              title: 'Paypal',
              logo: require('./../assets/PaymentAssets/paypal.png'),
              onpress: this.Paypal,
            })}
            {this.renderPaymentButton({
              title: 'GPay',
              logo: require('./../assets/PaymentAssets/Gpay.png'),
              onpress: this.Googlepay,
            })}
            {this.renderPaymentButton({
              title: 'Apple Pay',
              logo: require('./../assets/PaymentAssets/applePay.png'),
              onpress: this.ApplePay,
            })}
            {this.renderPaymentButton({
              title: 'Card',
              logo: require('./../assets/PaymentAssets/visa.png'),
              onpress: this.VisaAndMasterCard,
            })}
            {this.renderPaymentButton({
              title: 'Web Payment',
              logo: require('./../assets/PaymentAssets/web.png'),
              onpress: this.WebSidePayment,
            })}
          </View>
        ) : (
          <View />
        )}

        {this.state.showPaypalPage ? (
          <WebView
            onNavigationStateChange={e => {
              var jsonUrl = new URL(e.url);
              var state = jsonUrl.searchParams.get('state');

              if (state) {
                this.setState({
                  showPaypalPage: false,
                  showOptions: true,
                });
                if (state == 'success') {
                  this.props.navigation.pop();
                }
              }
            }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            style={{
              flex: 1,
              width: fw,
              height: fh,
            }}
            source={{
              uri: this.state.paypalURL,
            }}
          />
        ) : (
          <View />
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  ScrollViewSize: {
    backgroundColor: '#f6f9fa',
    height: fh * 0.9,
    width: fw,
  },
  nav: {
    width: fw,
    height: fh * 0.1,
    backgroundColor: '#FF8865',
    // elevation: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nav_lsit: {
    width: 25,
    height: 20,
    marginLeft: 20,
  },
  nav_Logo: {
    width: fw,
    zIndex: -1,
    position: 'absolute',
    textAlign: 'center',
    fontSize: 21,
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,.16)',
    textShadowRadius: 6,
    textShadowOffset: {
      width: 0,
      height: 3,
    },
  },
  navCountryCover: {
    position: 'absolute',
    width: fw,
    zIndex: -1,
    alignItems: 'flex-end',
    padding: 10,
  },
  navCountry: {
    width: 21,
    height: 21,
  },
  title: {
    color: '#000',
    marginTop: 25,
    marginBottom: 25,
    fontWeight: 'bold',
    fontSize: 23,
    textAlign: 'center',
    textShadowRadius: 6,
    textShadowOffset: {
      width: 0,
      height: 3,
    },
  },
});
