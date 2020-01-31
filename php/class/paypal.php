<?php

require  '../vendor/paypal/autoload.php';

use PayPal\Api\Amount;
use PayPal\Api\Details;
use PayPal\Api\Payment;
use PayPal\Api\PaymentExecution;
use PayPal\Api\Transaction;



class paypalClass
{




    public function CreatePayLink($cost, $successUrl, $CancelUrl, $errorUrl)
    {

        $apiContext = new \PayPal\Rest\ApiContext(
            new \PayPal\Auth\OAuthTokenCredential(
                '',     // ClientID
                ''      // ClientSecret
            )
        );
        $apiContext->setConfig(
            array(
                'log.LogEnabled' => true,
                'log.FileName' => 'PayPal.log',
                'log.LogLevel' => 'DEBUG',
                'mode' => 'live'
            )
        );


        if (!isset($cost)) return '{"error" : "No valld Cost" }';

        $cost = $cost . '.0'; // like 1.0 is 1 doller;


        // After Step 2
        $payer = new \PayPal\Api\Payer();
        $payer->setPaymentMethod('paypal');

        $amount = new \PayPal\Api\Amount();
        $amount->setTotal($cost);
        $amount->setCurrency('USD');

        $transaction = new \PayPal\Api\Transaction();
        $transaction->setAmount($amount);

        $redirectUrls = new \PayPal\Api\RedirectUrls();
        $redirectUrls->setReturnUrl($successUrl)
            ->setCancelUrl($CancelUrl);




        $payment = new \PayPal\Api\Payment();
        $payment->setIntent('sale')
            ->setPayer($payer)
            ->setTransactions(array($transaction))
            ->setRedirectUrls($redirectUrls);


        try {
            $payment->create($apiContext);
            // echo $payment;
            return  $payment->getApprovalLink(); // payment new line
        } catch (\PayPal\Exception\PayPalConnectionException $ex) {
            // This will print the detailed information on the exception.
            //REALLY HELPFUL FOR DEBUGGING
            return $ex->getData();
        }
    }

    public function PaymentInject($paymentid, $PayerID)
    {

        $apiContext = new \PayPal\Rest\ApiContext(
            new \PayPal\Auth\OAuthTokenCredential(
                '',     // ClientID
                ''      // ClientSecret
            )
        );

        $payment = Payment::get($paymentid, $apiContext);


        $exs = new PaymentExecution();

        $exs->setPayerId($PayerID);


        try {
            $r = $payment->execute($exs, $apiContext);
        } catch (Exception $e) {
            return false;
        }


        return true;
    }
}
