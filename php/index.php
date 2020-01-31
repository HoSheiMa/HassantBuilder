<?php

include './class/paypal.php';
include './class/stripe.php';

$checkKey = "hassantBuildKey1";

$stripe = new StripeClass;
$paypal = new paypalClass;


if (!isset($_GET['checkKey']) || $_GET['checkKey'] != $checkKey) {
    echo '{"error" : "Not support UNKNOW api"}';
    return;
}

if (!isset($_GET['req'])) {g
    echo '{"error" : "not found requies"}';
    return;
}
$req = $_GET['req'];
if ($req == "stripePayment") {
    if (!isset($_GET['stripeToken'])) {
        echo '{"error" : "not found stripeToken"}';
        return;
    }
    if (!isset($_GET['amount'])) {
        echo '{"error" : "not found amount"}';
        return;
    }
    if (!isset($_GET['description'])) {
        echo '{"error" : "not found description"}';
        return;
    }
    $description = $_GET['description'];
    $token = $_GET['stripeToken'];
    $amount = $_GET['amount'];
    // echo $token;
    $stripe->charge($token, $amount, $description);
    echo json_encode($charge);
} else if ($req == "paypalPaymentGetLink") {
    if (!isset($_GET['cost'])) {
        echo '{"error" : "not found cost"}';
        return;
    }
    if (!isset($_GET['successUrl'])) {
        echo '{"error" : "not found successUrl"}';
        return;
    }
    if (!isset($_GET['cancelUrl'])) {
        echo '{"error" : "not found cancelUrl"}';
        return;
    }
    $cost = $_GET['cost'];
    $successUrl = $_GET['successUrl'];
    $cancelUrl = $_GET['cancelUrl'];
    $link  = $paypal->CreatePayLink($cost, $successUrl, $CancelUrl, null);
    echo '{"link" : "' . $link . '", error: null}';
} else if ($req == "paypalPaymentCharge") {

    if (
        !isset($_GET['paymentId']) ||
        !isset($_GET['PayerID']) ||
        !isset($_GET['state'])
    ) {

        $pId = $_GET['paymentId'];
        $PayerID = $_GET['PayerID'];
        $state = $_GET['state'];



        $paypal->PaymentInject($pId, $PayerID);
    } else {
        echo '{"error" : "not found token"}';
        return;
    }
}
