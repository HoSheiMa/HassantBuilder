<?php

require './../vendor/stripe/autoload.php';
// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
\Stripe\Stripe::setApiKey('sk_test_7vwULRYGJ6jJoInfKUvdhhqc00QAlwZ9Bn');

class StripeClass
{
    public function charge($token, $amount, $description)
    {
        $charge = \Stripe\Charge::create([
            'amount' => $amount,
            'currency' => 'usd',
            'description' => $description,
            'source' => $token,
            'statement_descriptor' => 'Custom descriptor',
        ]);
        return $charge;
    }
}
